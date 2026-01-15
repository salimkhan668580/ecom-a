import { Feather } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthService from "../../services/auth";
import Toast from "react-native-toast-message";
import { AxiosError } from "axios";


const OtpVerification = ({email,setStep,step}) => {

    const otpInputRefs = useRef<(TextInput | null)[]>([]);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(10);
    const [canResend, setCanResend] = useState(false);

    const verifyOtpMutation = useMutation({
        mutationFn: (otp: number) => AuthService.verifyOtp(email, otp),
        onSuccess: (result: { message: string }) => {
            Toast.show({
                type: "success",
                text1: result?.message ?? "OTP verified successfully",
            });
            setStep("resetPassword");
        },
        onError: (error:unknown) => {
            if(error instanceof AxiosError) {
                Toast.show({
                    type: "error",
                    text1: (error as AxiosError<{ message: string }>)?.response?.data?.message ?? "Something went wrong",
                });
            }
            else {
                console.log(error);
                Toast.show({
                    type: "error",
                    text1: "Something went wrong",
                });
            }
        },
    });

    const forgetEmailMutation = useMutation({
        mutationFn: (email: string) => AuthService.forgetEmail(email),
        onSuccess: (result: { otp: string }) => {
          setStep("otp");
          setOtp(["", "", "", ""]);
          otpInputRefs.current[0]?.focus();
          setCanResend(false);
          setTimer(10);
           Toast.show({
            type: "success",
            text1:`OTP is  ${result?.otp}`,
          });
        },
        onError: (error:unknown) => {
        
          if(error instanceof AxiosError) {
            Toast.show({
              type: "error",
              text1: error.response?.data?.message ?? "Something went wrong",
            });
          }
          else {
            console.log(error);
            Toast.show({
              type: "error",
              text1: "Something went wrong",
            });
          }
        },
      });

      // Auto-focus next OTP input
  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) {
      // Handle paste
      const pastedOtp = value.slice(0, 4).split("");
      const newOtp = [...otp];
      pastedOtp.forEach((digit, i) => {
        if (index + i < 4) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      // Focus last input
      if (index + pastedOtp.length < 4) {
        otpInputRefs.current[index + pastedOtp.length]?.focus();
      }
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };
    // Timer countdown
    useEffect(() => {
        if (step === "otp" && timer > 0) {
          const interval = setInterval(() => {
            setTimer((prev) => {
              if (prev <= 1) {
                setCanResend(true);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
          return () => clearInterval(interval);
        }
      }, [step, timer]);
    
  const handleOtpSubmit = () => {
    const otpString = otp.join("");
    if (otpString.length !== 4) {
      Alert.alert("Error", "Please enter the complete 4-digit OTP");
      return;
    }

    setOtp(["", "", "", ""]);
    otpInputRefs.current[0]?.focus();
    setCanResend(false);
    setTimer(10);
    const optNumber = Number(otpString);
    verifyOtpMutation.mutate(optNumber);

   
  };

  const handleResendOtp = () => {

    forgetEmailMutation.mutate(email);

  };

  const handleOtpKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };
    return (
        <SafeAreaView className="flex-1 bg-background">
          <View className="flex-1 items-center justify-center px-6">
            <View className="mb-16 w-full border-2 border-primary rounded-lg px-3 min-h-1/2">
              <View className="flex-2 items-center justify-center py-6">
                <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center mb-4">
                  <Feather name="mail" size={40} color="#7C3AED" />
                </View>
              </View>
  
              <View className="mb-6">
                <Text className="text-normal-text text-2xl font-bold mb-2 text-center">
                  Verify OTP
                </Text>
                <Text className="text-secondary-text text-sm text-center mb-2">
                  We&apos;ve sent a 6-digit code to
                </Text>
                <Text className="text-primary text-sm text-center font-semibold">
                  {email}
                </Text>
              </View>
  
              <View className="flex-row justify-between mb-6">
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      otpInputRefs.current[index] = ref;
                    }}
                    value={digit}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onKeyPress={({ nativeEvent }) =>
                      handleOtpKeyPress(nativeEvent.key, index)
                    }
                    keyboardType="number-pad"
                    maxLength={1}
                    className="w-12 h-14 border-2 border-gray-300 bg-white rounded-md text-center text-xl font-bold"
                    style={styles.otpInput}
                  />
                ))}
              </View>
  
              <TouchableOpacity
                onPress={handleOtpSubmit}
                className="w-full h-12 bg-primary rounded-md items-center justify-center mb-4"
              >
                {verifyOtpMutation.isPending ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="text-white text-base font-semibold">
                  Verify OTP
                </Text>
                )}
              </TouchableOpacity>
  
              <View className="flex items-center my-4 justify-center">
                {canResend ? (
                  <TouchableOpacity onPress={handleResendOtp}>
                    {forgetEmailMutation.isPending ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Text className="text-primary text-center text-sm font-semibold">
                      Resend OTP
                    </Text>
                    )}
                  </TouchableOpacity>
                ) : (
                  <Text className="text-secondary-text text-center text-sm">
                    Resend OTP in {timer}s
                  </Text>
                )}
              </View>
  
              <View className="flex items-center my-2 justify-center">
                <TouchableOpacity onPress={() => setStep("email")}>
                  <Text className="text-secondary-text text-center text-sm">
                    Change email address
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      );

}

export default OtpVerification;

const styles = StyleSheet.create({
    otpInput: {
      borderWidth: 1,
      borderColor: "#D1D5DB",
      backgroundColor: "#FFFFFF",
    },
    buttonContainer: {
      borderRadius: 12,
      overflow: "hidden",
      shadowColor: "#7C3AED",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
    gradientButton: {
      paddingVertical: 16,
      paddingHorizontal: 32,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
    },
  });