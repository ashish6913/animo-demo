import type { InitConfig } from '@aries-framework/core'
import type { Express } from 'express'

import {
  AutoAcceptProof,
  ConnectionInvitationMessage,
  LogLevel,
  Agent,
  AutoAcceptCredential,
  HttpOutboundTransport,
  WsOutboundTransport,
} from '@aries-framework/core'
import { agentDependencies, HttpInboundTransport } from '@aries-framework/node'
import { startServer } from '@aries-framework/rest'
import { static as stx } from 'express'
import { connect } from 'ngrok'
import { createExpressServer, useContainer } from 'routing-controllers'
import { Container } from 'typedi'

import { CredDefService } from './controllers/CredDefService'
import { AgentCleanup } from './utils/AgentCleanup'
import { TestLogger } from './utils/logger'
import { BCOVRIN_TEST_GENESIS } from './utils/utils'

const logger = new TestLogger(process.env.NODE_ENV ? LogLevel.error : LogLevel.debug)

process.on('unhandledRejection', (error) => {
  if (error instanceof Error) {
    logger.fatal(`Unhandled promise rejection: ${error.message}`, { error })
  } else {
    logger.fatal('Unhandled promise rejection due to non-error error', {
      error,
    })
  }
})

const run = async () => {
  const endpoint = process.env.AGENT_ENDPOINT ?? (await connect({
    addr: 5001,
    authtoken: '1mdXuzNL2LsrDAX6nJprQPLc2VJ_5LARmZLWkomGf38G51jY5'
  }))
  const agentConfig: InitConfig = {
    label: 'CRA',
    walletConfig: {
      id: 'CRA Solutions',
      key: process.env.AGENT_WALLET_KEY ?? 'Cra',
    },
    indyLedgers: [
      {
        id: 'BCOVRIN_TEST_GENESIS',
        genesisTransactions: BCOVRIN_TEST_GENESIS,
        isProduction: false,
      },
    ],
    logger: logger,
    publicDidSeed: process.env.AGENT_PUBLIC_DID_SEED,
    endpoints: [endpoint],
    autoAcceptConnections: true,
    autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
    autoAcceptProofs: AutoAcceptProof.ContentApproved,
    useLegacyDidSovPrefix: true,
    connectionImageUrl: 'https://lespromenades.com/wp-content/uploads/2021/09/0822cab22c9104aa8468e7985463d1fa9ab2f1eb-1.png'
  }

  const agent = new Agent(agentConfig, agentDependencies)

  const httpInbound = new HttpInboundTransport({
    port: 5001,
  })

  agent.registerInboundTransport(httpInbound)

  agent.registerOutboundTransport(new HttpOutboundTransport())
  agent.registerOutboundTransport(new WsOutboundTransport())

  await agent.initialize()

  const app: Express = createExpressServer({
    controllers: [__dirname + '/controllers/**/*.ts', __dirname + '/controllers/**/*.js'],
    cors: true,
    routePrefix: '/demo',
  })

  httpInbound.app.get('/', async (req, res) => {
    if (typeof req.query.c_i === 'string') {
      try {
        const invitation = await ConnectionInvitationMessage.fromUrl(req.url.replace('d_m=', 'c_i='))
        res.send(invitation.toJSON())
      } catch (error) {
        res.status(500)
        res.send({ detail: 'Unknown error occurred' })
      }
    }
  })

  app.use('/public', stx(__dirname + '/public'))

  const credDefService = new CredDefService(agent)
  useContainer(Container)
  Container.set(CredDefService, credDefService)

  const job = AgentCleanup(agent)
  job.start()

  app.get('/server/last-reset', async (req, res) => {
    res.send(job.lastDate())
  })

  await startServer(agent, {
    port: 5000,
    app: app,
    cors: true,
  })
}

run()
