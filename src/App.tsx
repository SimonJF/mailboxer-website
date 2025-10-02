import { Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import ActorCommunicationErrors from "./components/pages/ActorCommunicationErrors";
import BehaviouralTypes from "./components/pages/BehaviouralTypes";
import Home from "./components/pages/Home";
import Mailboxer from "./components/pages/Mailboxer";
import MailboxerExamples from "./components/pages/MailboxerExamples";
import OmittedReply from "./components/pages/OmittedReply";
import PayloadMismatch from "./components/pages/PayloadMismatch";
import Sandbox from "./components/pages/Sandbox";
import UnexpectedRequest from "./components/pages/UnexpectedRequest";
import UnsupportedRequest from "./components/pages/UnsupportedRequest";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route index element={<Home />} /> {/* was path="/" */}
          <Route
            path="actor-communication-errors"
            element={<ActorCommunicationErrors />}
          />
          <Route
            path="actor-communication-errors/message-type-error/payload-mismatch"
            element={<PayloadMismatch />}
          />
          <Route
            path="actor-communication-errors/message-type-error/unsupported-request"
            element={<UnsupportedRequest />}
          />
          <Route
            path="actor-communication-errors/behavioural-type-error/unexpected-request"
            element={<UnexpectedRequest />}
          />
          <Route
            path="actor-communication-errors/behavioural-type-error/omitted-reply"
            element={<OmittedReply />}
          />
          <Route path="behavioural-types" element={<BehaviouralTypes />} />
          <Route path="mailboxer" element={<Mailboxer />} />
          <Route path="mailboxer-examples" element={<MailboxerExamples />} />
          <Route path="sandbox" element={<Sandbox />} />
          <Route path="about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
