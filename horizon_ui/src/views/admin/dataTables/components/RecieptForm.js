import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const ReceiptForm = () => {
  const [formData, setFormData] = useState({
    organization: "",
    recipient_name: "",
    amount: "",
    billing_address: "",
    description: "",
  });

  const [recipients, setRecipients] = useState([]);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // useEffect(() => {
  //   axios.get("http://127.0.0.1:8000/api/finance/receipt/")
  //     .then(response => {
  //       setRecipients(response.data.results);  // Store all receipt data
  //     })
  //     .catch(error => console.error("Error fetching receipts:", error));
  // }, []);

  const fetchAllRecipients = async () => {
    let allRecipients = [];
    let nextPage = "http://127.0.0.1:8000/api/finance/receipt/";
  
    try {
      while (nextPage) {
        const response = await axios.get(nextPage);
        allRecipients = [...allRecipients, ...response.data.results];
        nextPage = response.data.next; 
      }
      setRecipients(allRecipients);
    } catch (error) {
      console.error("Error fetching recipients:", error);
    }
  };
  
  useEffect(() => {
    fetchAllRecipients();
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/finance/receipt/", formData);
      toast({
        title: "Receipt created.",
        description: "The receipt has been successfully saved.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFormData({
        organization: "",
        recipient_name: "",
        amount: "",
        billing_address: "",
        description: "",
      });
    } catch (error) {
      toast({
        title: "Error creating receipt.",
        description: error.response?.data || "An error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxWidth="500px" mx="auto" mt="50px" p="6" boxShadow="md" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <FormControl mb="4" isRequired>
          <FormLabel>Organization</FormLabel>
          <select name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  required
          >
                  <option value="" disabled>Organization</option>
                  {[...new Set(recipients.map((receipt) => receipt.organization))].map((organization, index) => (
                    <option key={index} value={organization}>{organization}</option>
                  ))}
          </select>
        </FormControl>

        <FormControl mb="4" isRequired>
          <FormLabel>Recipient Name</FormLabel>
          <select
                name="recipient_name"
                value={formData.recipient_name}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Recipient Name</option>
                {recipients.map((receipt, index) => (
                  <option key={index} value={receipt.recipient_name}>{receipt.recipient_name}</option>
                ))}
          </select>
        </FormControl>

        <FormControl mb="4" isRequired>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter transaction amount"
          />
        </FormControl>

        <FormControl mb="4" isRequired>
          <FormLabel>Billing Address</FormLabel>
          <Textarea
            name="billing_address"
            value={formData.billing_address}
            onChange={handleChange}
            placeholder="Enter billing address"
          />
        </FormControl>

        <FormControl mb="4">
          <FormLabel>Description</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description (optional)"
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" width="full">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ReceiptForm;
