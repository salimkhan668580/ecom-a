import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DetailsHeader from "../../layout/DetailsHeader";

export default function PrivacyPolicy() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <DetailsHeader
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
      />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-6">
          <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
            <Text className="text-secondary-text text-xs mb-4">
              Last Updated: January 26, 2026
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              1. Introduction
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our application.
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              2. Information We Collect
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              We collect information that you provide directly to us, including:
              {"\n\n"}
              • Personal identification information (name, email address, phone number)
              {"\n"}
              • Payment information (credit card details, billing address)
              {"\n"}
              • Shipping and delivery addresses
              {"\n"}
              • Account credentials and preferences
              {"\n"}
              • Product reviews and ratings
              {"\n"}
              • Communication preferences
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              3. How We Use Your Information
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              We use the information we collect to:
              {"\n\n"}
              • Process and fulfill your orders
              {"\n"}
              • Send you order confirmations and updates
              {"\n"}
              • Respond to your customer service requests
              {"\n"}
              • Send you marketing communications (with your consent)
              {"\n"}
              • Improve our products and services
              {"\n"}
              • Detect and prevent fraud
              {"\n"}
              • Comply with legal obligations
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              4. Information Sharing
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              {"\n\n"}
              • With service providers who assist us in operating our business (payment processors, shipping companies)
              {"\n"}
              • When required by law or to protect our rights
              {"\n"}
              • In connection with a business transfer or merger
              {"\n"}
              • With your explicit consent
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              5. Data Security
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              6. Cookies and Tracking Technologies
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              We use cookies and similar tracking technologies to track activity on our application and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              7. Your Rights
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              You have the right to:
              {"\n\n"}
              • Access your personal data
              {"\n"}
              • Correct inaccurate data
              {"\n"}
              • Request deletion of your data
              {"\n"}
              • Object to processing of your data
              {"\n"}
              • Request data portability
              {"\n"}
              • Withdraw consent at any time
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              8. Data Retention
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              We retain your personal data only for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law.
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              9. Children's Privacy
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              10. Changes to This Policy
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              11. Contact Us
            </Text>
            <Text className="text-secondary-text text-base leading-6">
              If you have any questions about this Privacy Policy, please contact us at:
              {"\n\n"}
              Email: privacy@ourstore.com
              {"\n"}
              Phone: +1 (555) 123-4567
              {"\n"}
              Address: 123 Commerce Street, Business City, BC 12345
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
