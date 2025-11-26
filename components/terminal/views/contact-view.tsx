"use client"

import type React from "react"

import { useState } from "react"
import TerminalOutput from "../terminal-output"

export default function ContactView() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Connect to email service
    console.log("Message:", { email, message })
    setSubmitted(true)
    setTimeout(() => {
      setEmail("")
      setMessage("")
      setSubmitted(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <TerminalOutput title="GET IN TOUCH">
        <div className="space-y-4">
          <p className="text-terminal-text">
            Got a proposal? Want to collaborate? Or just want to yap about the latest crypto narrative? Hit me up.
          </p>

          {submitted ? (
            <div className="p-4 bg-terminal-success/20 border border-terminal-success rounded-lg">
              <p className="text-terminal-success">
                Message sent! I&apos;ll respond when I wake up from my sleep schedule.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-terminal-accent text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 bg-terminal-surface border border-terminal-accent/30 rounded text-terminal-text placeholder:text-terminal-muted focus:border-terminal-accent focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-terminal-accent text-sm mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Type something interesting..."
                  rows={4}
                  className="w-full px-4 py-2 bg-terminal-surface border border-terminal-accent/30 rounded text-terminal-text placeholder:text-terminal-muted focus:border-terminal-accent focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-terminal-accent text-terminal-bg font-bold rounded hover:bg-terminal-accent/80 transition-colors"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </TerminalOutput>

      <TerminalOutput title="QUICK LINKS">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="mailto:contact@0xtitan.network"
            className="p-4 bg-terminal-accent/10 border border-terminal-accent/20 rounded-lg hover:border-terminal-accent/60 transition-colors"
          >
            <div className="font-bold text-terminal-text mb-1">Email</div>
            <div className="text-terminal-muted text-sm">contact@0xtitan.network</div>
          </a>
          <a
            href="https://twitter.com/0xTitan"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-terminal-accent/10 border border-terminal-accent/20 rounded-lg hover:border-terminal-accent/60 transition-colors"
          >
            <div className="font-bold text-terminal-text mb-1">DM on Twitter</div>
            <div className="text-terminal-muted text-sm">Always checking DMs</div>
          </a>
        </div>
      </TerminalOutput>

      <div className="text-terminal-muted text-xs border-l-2 border-terminal-accent/30 pl-3 py-2">
        &gt; Email service integration coming soon. Currently using mock submission.
      </div>
    </div>
  )
}
