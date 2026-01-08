import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import ScreenLayout from "../../layout/ScreenLayout";
import { FontAwesome6 } from "@expo/vector-icons";

export default function HelpSupport() {
  const handleEmailPress = () => {
    Linking.openURL("mailto:support@ourstore.com");
  };

  const handlePhonePress = () => {
    Linking.openURL("tel:+15551234567");
  };

  const faqItems = [
    {
      question: "How do I place an order?",
      answer: "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your order.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, PayPal, and other secure payment methods. All transactions are encrypted for your security.",
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout for faster delivery (2-3 business days).",
    },
    {
      question: "Can I return or exchange items?",
      answer: "Yes! You can return or exchange items within 30 days of purchase. Items must be in original condition with tags attached. Visit your order history to initiate a return.",
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order in the 'My Orders' section of your account.",
    },
    {
      question: "Do you offer customer support?",
      answer: "Absolutely! Our customer support team is available 24/7 via email, phone, or live chat. We're here to help with any questions or concerns.",
    },
  ];

  return (
    <ScreenLayout title="Help & Support" showBackButton>
      <View className="px-6 pb-6">
        {/* Header Section */}
        <View className="items-center mb-6">
          <View className="w-20 h-20 rounded-full bg-primary/20 items-center justify-center mb-4">
            <FontAwesome6 name="question-circle" size={40} color="#7C3AED" />
          </View>
          <Text className="text-normal-text text-2xl font-bold text-center mb-2">
            How Can We Help?
          </Text>
          <Text className="text-secondary-text text-base text-center">
            We&apos;re here to assist you with any questions
          </Text>
        </View>

        {/* Quick Contact Section */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-3">
              <FontAwesome6 name="headset" size={20} color="#7C3AED" />
            </View>
            <Text className="text-normal-text text-xl font-semibold">Contact Us</Text>
          </View>
          <View className="gap-3">
            <TouchableOpacity
              onPress={handleEmailPress}
              className="flex-row items-center p-3 bg-gray-50 rounded-lg"
              activeOpacity={0.7}
            >
              <FontAwesome6 name="envelope" size={18} color="#7C3AED" />
              <View className="ml-3 flex-1">
                <Text className="text-secondary-text text-xs">Email Support</Text>
                <Text className="text-normal-text text-base font-medium">
                  support@ourstore.com
                </Text>
              </View>
              <FontAwesome6 name="chevron-right" size={16} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlePhonePress}
              className="flex-row items-center p-3 bg-gray-50 rounded-lg"
              activeOpacity={0.7}
            >
              <FontAwesome6 name="phone" size={18} color="#7C3AED" />
              <View className="ml-3 flex-1">
                <Text className="text-secondary-text text-xs">Phone Support</Text>
                <Text className="text-normal-text text-base font-medium">
                  +1 (555) 123-4567
                </Text>
              </View>
              <FontAwesome6 name="chevron-right" size={16} color="#9CA3AF" />
            </TouchableOpacity>

            <View className="flex-row items-center p-3 bg-gray-50 rounded-lg">
              <FontAwesome6 name="clock" size={18} color="#7C3AED" />
              <View className="ml-3 flex-1">
                <Text className="text-secondary-text text-xs">Support Hours</Text>
                <Text className="text-normal-text text-base font-medium">
                  24/7 Available
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* FAQ Section */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-3">
              <FontAwesome6 name="circle-question" size={20} color="#7C3AED" />
            </View>
            <Text className="text-normal-text text-xl font-semibold">Frequently Asked Questions</Text>
          </View>
          <View className="gap-4">
            {faqItems.map((item, index) => (
              <View key={index} className="pb-4 border-b border-gray-100 last:border-b-0">
                <Text className="text-normal-text text-base font-semibold mb-2">
                  {item.question}
                </Text>
                <Text className="text-secondary-text text-sm leading-5">
                  {item.answer}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Additional Help Section */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-full bg-primary/20 items-center justify-center mr-3">
              <FontAwesome6 name="book" size={20} color="#7C3AED" />
            </View>
            <Text className="text-normal-text text-xl font-semibold">Additional Resources</Text>
          </View>
          <View className="gap-3">
            <View className="flex-row items-center p-3 bg-gray-50 rounded-lg">
              <FontAwesome6 name="file-lines" size={18} color="#6B7280" />
              <Text className="text-secondary-text text-base ml-3 flex-1">
                Shipping & Delivery Guide
              </Text>
              <FontAwesome6 name="chevron-right" size={16} color="#9CA3AF" />
            </View>
            <View className="flex-row items-center p-3 bg-gray-50 rounded-lg">
              <FontAwesome6 name="rotate" size={18} color="#6B7280" />
              <Text className="text-secondary-text text-base ml-3 flex-1">
                Returns & Refunds Policy
              </Text>
              <FontAwesome6 name="chevron-right" size={16} color="#9CA3AF" />
            </View>
            <View className="flex-row items-center p-3 bg-gray-50 rounded-lg">
              <FontAwesome6 name="shield" size={18} color="#6B7280" />
              <Text className="text-secondary-text text-base ml-3 flex-1">
                Privacy & Security
              </Text>
              <FontAwesome6 name="chevron-right" size={16} color="#9CA3AF" />
            </View>
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
}
