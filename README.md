# Todo Summary Assistant

This is a full-stack application that allows users to create, manage, and summarize their to-do items. The summary is generated using a Large Language Model (LLM) and then sent to a specified Slack channel.

## Features

* **Frontend (React)**[cite: 3]:
    * Add, edit, and delete to-do items.
    * View a list of current to-dos.
    * Button to generate and send the summary to Slack.
    * Success/failure messages for Slack operations.
* **Backend (Node.js with Express)**[cite: 5, 14]:
    * REST API for managing to-do items.
    * Endpoint to trigger LLM summarization.
    * Endpoint to send summaries to Slack.
* **LLM Integration**: Uses a real LLM (e.g., OpenAI) to provide meaningful summaries of pending to-do items. [cite: 2, 8, 9, 10]
* **Slack Integration**: Posts summaries to a Slack channel using Incoming Webhooks. [cite: 3, 10]
* **Database**: Stores to-do items in PostgreSQL (or Supabase/Firebase Firestore). [cite: 12]

## Tech Stack

* **Frontend**: React [cite: 3, 13]
* **Backend**: Node.js (Express) [cite: 5, 14]
* **Database**: PostgreSQL (or Supabase/Firebase Firestore) [cite: 12]
* **LLM**: OpenAI (or Anthropic, Cohere, Mistral, etc.) [cite: 2, 8]
* **Slack**: Incoming Webhooks [cite: 10]

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

* Node.js (LTS version recommended)
* npm (usually comes with Node.js)
* PostgreSQL (or account with Supabase/Firebase for database)
* An API Key for your chosen LLM (e.g., OpenAI API Key)
* A Slack Workspace and an Incoming Webhook URL

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd todo-summary-assistant
