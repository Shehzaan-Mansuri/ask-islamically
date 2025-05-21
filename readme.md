# **Ask Islamically**

**Ask Islamically** is an AI-powered web application designed to provide accurate, authentic Islamic knowledge based on the Quran and Sunnah. The app helps Muslims strengthen their faith and practice, while also providing non-Muslims with reliable information about Islam from trustworthy sources.

This project uses a modern tech stack, including **Next.js** and **OpenAI API**, to offer a seamless user experience. It provides **Q\&A functionality** powered by AI, designed to answer questions about Islam in a respectful and educational manner.

---

## **Preview Images**

<div align="center">

|           Home Page            |             Home (Dark Mode)             |
| :----------------------------: | :--------------------------------------: |
| ![Home Page](/assets/Home.png) | ![Home-Dark Page](/assets/Home-Dark.png) |

|           Chat Page            |            Muslim User             |              Non-Muslim User               |
| :----------------------------: | :--------------------------------: | :----------------------------------------: |
| ![Chat Page](/assets/Chat.png) | ![Muslim User](/assets/Muslim.png) | ![Non-Muslim User](/assets/Non-Muslim.png) |

</div>

---

## **Features**

- **AI-Powered Responses**: Uses OpenAI's language model to generate accurate, context-aware answers based on Islamic teachings.
- **Customizable User Experience**: Provides different responses for Muslim and non-Muslim users, with respect to their context.
- **Simple, Clean UI**: Built with React and Next.js for a smooth, interactive user interface.
- **Respectful Interactions**: AI answers are rooted in the Quran and authentic Hadith, with an emphasis on clarity, respect, and understanding.
- **Font Customization**: Includes Arabic script support with a custom font (Amiri) for better readability.

---

## **Tech Stack**

- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: [OpenAI API](https://beta.openai.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Fonts**: [Amiri Font](https://www.amirifont.org/)
- **Hosting**: [Vercel](https://vercel.com/) (for frontend deployment)

---

## **Getting Started**

Follow the steps below to set up and run the project locally.

### **Prerequisites**

- **Node.js** and **npm** (or **Yarn**) installed on your machine.
- A **GitHub** account for version control.
- An **OpenAI API key** for generating AI responses (you can get it from [OpenAI](https://beta.openai.com/signup/)).

### **Setup Steps**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Shehzaan-Mansuri/ask-islamically.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd ask-islamically
   ```

3. **Install dependencies**:

   Using npm:

   ```bash
   npm install
   ```

   Or using Yarn:

   ```bash
   yarn install
   ```

4. **Set up environment variables**:

   Create a `.env.local` file in the root of your project, and add your **OpenAI API key**:

   ```env
   OPENAI_API_KEY=your-openai-api-key-here
   ```

5. **Run the app locally**:

   To start the development server, run:

   ```bash
   npm run dev
   ```

   Or with Yarn:

   ```bash
   yarn dev
   ```

   Your app will be running on `http://localhost:3000`.

---

## **Deployment**

This project is deployed on **Vercel** for easy deployment and hosting. You can deploy it to your own Vercel account by following these steps:

1. **Connect to Vercel**:

   - Go to [Vercel](https://vercel.com/), log in, and connect your GitHub account.
   - Create a new project and link it to the GitHub repository.
   - Vercel will automatically detect it as a **Next.js** project and deploy it.

2. **Set up environment variables on Vercel**:

   - In your Vercel dashboard, go to your project’s settings.
   - Add the `OPENAI_API_KEY` as an environment variable under the **Environment Variables** section.

---

## **Contributing**

We welcome contributions to make **Ask Islamically** better!

To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add your changes'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

---

## **Acknowledgements**

- **OpenAI** for their API, which powers the AI responses in this app.
- **Tailwind CSS** for helping build a responsive UI with minimal effort.
- **Vercel** for providing an amazing platform for hosting Next.js apps.

---

### **Contact**

For feedback, suggestions, or collaboration, feel free to reach out to me at:
**Email**: [shehzaanmansuri1@gmail.com](mailto:shehzaanmansuri1@gmail.com)
**LinkedIn**: [Shehzaan Mansuri](https://www.linkedin.com/in/shehzaan-mansuri-997210195/)

---

This **README** provides clear instructions for setting up, deploying, and contributing to your project. Make sure to replace **`Shehzaan-Mansuri`** with your actual GitHub username and update the necessary details (like the OpenAI API key) before pushing it to your repository.
