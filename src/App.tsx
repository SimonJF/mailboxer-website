import { Route, Routes } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import About from './components/pages/About'
import ActorCommunicationErrors from './components/pages/ActorCommunicationErrors'
import BehaviouralTypeErrors from './components/pages/BehaviouralTypeErrors'
import BehaviouralTypes from './components/pages/BehaviouralTypes'
import Home from './components/pages/Home'
import Mailboxer from './components/pages/Mailboxer'
import MailboxerExamples from './components/pages/MailboxerExamples'
import MessageTypeErrors from './components/pages/MessageTypeErrors'
import Sandbox from './components/pages/Sandbox'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/actor-communication-errors" element={<ActorCommunicationErrors />} />
          <Route path="/actor-communication-errors/message-type-errors" element={<MessageTypeErrors />} />
          <Route path="/actor-communication-errors/behavioural-type-errors" element={<BehaviouralTypeErrors />} />
          <Route path="/behavioural-types" element={<BehaviouralTypes />} />
          <Route path="/mailboxer" element={<Mailboxer />} />
          <Route path="/mailboxer-examples" element={<MailboxerExamples />} />
          <Route path="/sandbox" element={<Sandbox />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
