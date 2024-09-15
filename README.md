# Next.js AI Chat Application

This project is a Next.js-based AI chat application that leverages the power of artificial intelligence to provide interactive conversations. It allows users to chat with AI about uploaded PDF documents.

## Features

- Built with Next.js 13 App Router
- AI-powered chat functionality using OpenAI
- PDF upload and chat functionality
- User authentication with Clerk
- Responsive layout using Shadcn UI
- Database integration with DrizzleORM
- File storage with Amazon S3
- Vector database with Pinecone for efficient document querying

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Set up environment variables (for Clerk, OpenAI, S3, Pinecone, etc.)
4. Run the development server:
   ```
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `src/app/page.tsx`: Main page component
- `src/app/layout.tsx`: Root layout component
- `src/app/chat/[chatId]/page.tsx`: Individual chat page
- `src/app/api/chat/route.ts`: API route for chat functionality
- `src/app/api/create-chat/route.ts`: API route for creating new chats
- `src/components/`: Reusable components (ChatComponent, ChatSideBar, PDFViewer, etc.)
- `src/lib/`: Utility functions and database setup

## Key Features

- PDF Upload: Users can upload PDF documents to chat about.
- AI-Powered Chat: Utilizes OpenAI to generate responses based on the uploaded PDFs.
- User Authentication: Secure login and user management with Clerk.
- Subscription Checking: Functionality to check user subscription status.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[Add your chosen license here]
