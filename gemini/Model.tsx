import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  

    export const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "how can I build vector embeddings using google gemini\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Unfortunately, you cannot directly build vector embeddings using Google Gemini in its current state. \n\nHere's why:\n\n* **Gemini is a large language model (LLM):** It excels at tasks like text generation, translation, and summarization. \n* **Vector embeddings are primarily used for tasks related to similarity search and information retrieval.** While LLMs can be used to generate text representations that can be used for downstream similarity tasks, they aren't typically designed to directly create embeddings.\n\n**Here's how you can potentially achieve similar results using Google tools:**\n\n1. **Utilize Google's Sentence Transformers:** This library provides pre-trained models specifically designed for creating sentence embeddings. You can leverage these models to generate vector representations for your text data. \n    * **Example:** `from sentence_transformers import SentenceTransformer\n    model = SentenceTransformer('paraphrase-distilroberta-base-v1')\n    embeddings = model.encode(['This is a sentence.', 'Another sentence here.'])`\n2. **Employ Google Search/Knowledge Graph:** If you're aiming to create embeddings for concepts or entities, you can leverage Google's vast knowledge graph and search API. You can query these services to extract information about your target entities and then use this information to create embeddings.\n\n**Alternatives:**\n\n* **Other embedding models:** You can explore other popular libraries for generating embeddings like **Hugging Face's Transformers** or **Gensim's Word2Vec**.\n* **Pre-trained embeddings:** Many pre-trained word and sentence embeddings are available online, like **GloVe**, **FastText**, and **Word2Vec**.\n\n**Remember:** Building effective embeddings often requires specialized knowledge and fine-tuning based on your specific needs. \n\nIf you provide more context about your intended use case, I can offer more tailored advice. \n"},
          ],
        },
      ],
    });
