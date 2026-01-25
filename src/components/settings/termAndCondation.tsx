import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DetailsHeader from "../../layout/DetailsHeader";

export default function TermsAndConditions() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <DetailsHeader
        title="Terms and Conditions"
        subtitle="Please read our terms of service carefully"
      />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pb-6">
          <View className="bg-white rounded-xl p-6 mb-4 shadow-sm">
            <Text className="text-secondary-text text-xs mb-4">
              Last Updated: January 26, 2026
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              1. Acceptance of Terms
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              2. Use License
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              Permission is granted to temporarily download one copy of the materials on our application for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              {"\n\n"}
              • Modify or copy the materials
              {"\n"}
              • Use the materials for any commercial purpose or for any public display
              {"\n"}
              • Attempt to decompile or reverse engineer any software contained in the application
              {"\n"}
              • Remove any copyright or other proprietary notations from the materials
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              3. User Account
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              4. Products and Services
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              We reserve the right to limit the sales of our products or services to any person, geographic region, or jurisdiction. We may exercise this right on a case-by-case basis. All descriptions of products or product pricing are subject to change at any time without notice, at our sole discretion.
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              5. Payment Terms
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              All payments are processed securely through our payment gateway. By making a purchase, you agree to pay the price listed for the product or service. We reserve the right to refuse or cancel any order at any time for reasons including but not limited to product availability, errors in the description or price of the product, or error in your order.
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              6. Returns and Refunds
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              Our return policy allows you to return items within 30 days of purchase. Items must be in their original condition with tags attached. Refunds will be processed to the original payment method within 5-10 business days after we receive and inspect the returned item.
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              7. Intellectual Property
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              The Service and its original content, features, and functionality are and will remain the exclusive property of the Company and its licensors. The Service is protected by copyright, trademark, and other laws.
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              8. Limitation of Liability
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              In no event shall the Company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              9. Governing Law
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              These Terms shall be interpreted and governed by the laws of the jurisdiction in which the Company operates, without regard to its conflict of law provisions.
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              10. Changes to Terms
            </Text>
            <Text className="text-secondary-text text-base leading-6 mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
            </Text>

            <Text className="text-normal-text text-lg font-semibold mb-3">
              11. Contact Information
            </Text>
            <Text className="text-secondary-text text-base leading-6">
              If you have any questions about these Terms and Conditions, please contact us at:
              {"\n\n"}
              Email: legal@ourstore.com
              {"\n"}
              Phone: +1 (555) 123-4567
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
