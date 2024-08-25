"use client";  // Add this line to indicate that this is a Client Component

import React, { useState } from "react";
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Alert } from "@mui/material";
import axios from "axios";

const InputForm = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Parse the JSON input from the user
      const parsedInput = JSON.parse(jsonInput);

      // Ensure parsedInput has the correct structure
      const requestBody = {
        data: parsedInput
      };

      console.log("Request Body:", requestBody);  // Print request body for debugging

      // Send POST request to the API
      const response = await axios.post("https://ayush-bajaj-finserv.vercel.app/bfhl", requestBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Print the response data to the console
      console.log("API Response:", response.data);

      setResponseData(response.data);
    } catch (err) {
      setError("Invalid JSON input or API request failed");
      console.error("Error:", err);  // Log error details to the console
    }
  };

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setSelectedOptions(typeof value === 'string' ? value.split(',') : value);
  };

  const renderResponse = () => {
    if (!responseData) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = responseData;
    const output = {};

    if (selectedOptions.includes("Numbers")) output.numbers = numbers;
    if (selectedOptions.includes("Alphabets")) output.alphabets = alphabets;
    if (selectedOptions.includes("Highest Lowercase Alphabet"))
      output.highest_lowercase_alphabet = highest_lowercase_alphabet;

    return <pre>{JSON.stringify(output, null, 2)}</pre>;
  };

  return (
    <div style={{ padding: '16px', backgroundColor: '#f4f6f8' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          label="Enter JSON input"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          sx={{
            backgroundColor: '#ffffff',
            color: '#333333',
            '& .MuiInputLabel-root': { color: '#555555' },  // Label color
            '& .MuiInputBase-root': { color: '#333333' },  // Input text color
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#cccccc' },  // Border color
              '&:hover fieldset': { borderColor: '#007bff' },  // Border color on hover
            },
          }}
        />
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>

      {responseData && (
        <div style={{ marginTop: '16px' }}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Select Data to Display</InputLabel>
            <Select
              labelId="select-label"
              multiple
              value={selectedOptions}
              onChange={handleOptionChange}
              renderValue={(selected) => selected.join(', ')}
              variant="outlined"
              sx={{
                '& .MuiSelect-select': { color: '#333333' },  // Text color of select
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#cccccc' },  // Border color
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#007bff' },  // Border color on hover
              }}
            >
              <MenuItem value="Numbers">Numbers</MenuItem>
              <MenuItem value="Alphabets">Alphabets</MenuItem>
              <MenuItem value="Highest Lowercase Alphabet">Highest Lowercase Alphabet</MenuItem>
            </Select>
          </FormControl>

          <div style={{ marginTop: '16px' }}>{renderResponse()}</div>
        </div>
      )}
    </div>
  );
};

export default InputForm;
