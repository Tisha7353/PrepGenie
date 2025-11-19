import { GoogleGenerativeAI } from "@google/generative-ai";
import { questionAnswerPrompt } from "../utils/prompts.js";
import { conceptExplainPrompt } from "../utils/prompts.js";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });


export const generateInterviewQuestions = async (req, res) => {
  let text="";
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    text = response.text();

   
    const extractJSON = (str) => {
      // Case 1: Already valid JSON
      try {
        return JSON.parse(str);
      } catch (e) {
        // Case 2: Wrapped in markdown
        const jsonMatch = str.match(/```(?:json)?\n([\s\S]*?)\n```/);
        if (jsonMatch) {
          try {
            return JSON.parse(jsonMatch[1]);
          } catch (e) {
            throw new Error("Found JSON markdown but parsing failed");
          }
        }
        // Case 3: Try to find JSON substring
        const jsonStart = str.indexOf('{');
        const jsonEnd = str.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
          try {
            return JSON.parse(str.slice(jsonStart, jsonEnd + 1));
          } catch (e) {
            throw new Error("Could not extract valid JSON from response");
          }
        }
        throw new Error("No valid JSON found in response");
      }
    };

    const questions = extractJSON(text);
    res.status(200).json({ success: true, questions });

  } catch (error) {
    console.error("Full error:", { 
      message: error.message,
      responseText: text || "Not available",
      stack: error.stack 
    });
    res.status(500).json({ 
      success: false,
      message: "Failed to process AI response",
      error: error.message,
      hint: "Ensure your prompt forces valid JSON output"
    });
  }
};
 export const generateConceptExplanation = async (req, res) => {
  let text="";
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing required field: question" });
    }

    const prompt = conceptExplainPrompt(question);
    const result = await model.generateContent(prompt);
    const response = await result.response;
     text = response.text();

    // Improved JSON extraction (same as generateInterviewQuestions)
    const extractJSON = (str) => {
      // Case 1: Already valid JSON
      try {
        return JSON.parse(str);
      } catch (e) {
        // Case 2: Wrapped in markdown
        const jsonMatch = str.match(/```(?:json)?\n([\s\S]*?)\n```/);
        if (jsonMatch) {
          try {
            return JSON.parse(jsonMatch[1]);
          } catch (e) {
            throw new Error("Found JSON markdown but parsing failed");
          }
        }
        // Case 3: Try to find JSON substring
        const jsonStart = str.indexOf('{');
        const jsonEnd = str.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
          try {
            return JSON.parse(str.slice(jsonStart, jsonEnd + 1));
          } catch (e) {
            throw new Error("Could not extract valid JSON from response");
          }
        }
        throw new Error("No valid JSON found in response");
      }
    };

    const explanation = extractJSON(text);
    res.status(200).json({ success: true, explanation });

  } catch (error) {
    console.error("Full error:", { 
      message: error.message,
      responseText: text || "Not available",
      stack: error.stack 
    });
    res.status(500).json({ 
      success: false,
      message: "Failed to generate explanation",
      error: error.message,
      hint: "Ensure your prompt forces valid JSON output"
    });
  }
};
