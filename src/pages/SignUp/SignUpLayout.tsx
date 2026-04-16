import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Shield, CheckCircle } from 'lucide-react';
import StepDots from '../../components/ui/StepDots';
import Step1_Company from './Step1_Company';
import Step2_Role from './Step2_Role';
import Step3_Endpoints from './Step3_Endpoints';
import Step4_Password from './Step4_Password';

export interface SignUpData {
  company: string;
  industry: string;
  city: string;
  role: string;
  endpointCount: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export default function SignUpLayout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<SignUpData>>({});
  const navigate = useNavigate();

  const updateFormData = (data: Partial<SignUpData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
    navigate(`/signup/step/${step}`);
  };

  return (
    <div className="min-h-screen bg-navy-800 flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-navy-900 to-navy-800 p-12 flex-col justify-between border-r border-gray-700/50">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <Shield className="h-10 w-10 text-shield-blue" />
            <span className="text-3xl font-display font-bold text-white">ShieldAI</span>
          </div>

          <h2 className="text-4xl font-display font-bold text-white mb-6">
            Join South Africa's most intelligent security platform
          </h2>

          <div className="space-y-4 mb-12">
            {[
              'Deploy in minutes',
              'No dedicated security team needed',
              'Stay protected during load-shedding',
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-300 text-lg">{text}</span>
              </div>
            ))}
          </div>

          <div className="bg-navy-700/50 border border-gray-600/50 rounded-xl p-6">
            <p className="text-gray-300 italic mb-3">
              "ShieldAI detected 31 threats our existing antivirus missed in the first two weeks."
            </p>
            <p className="text-sm text-gray-400">— IT Manager, Cape Town Legal Partners</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-navy-700 border border-gray-600/50 rounded-xl p-8 shadow-2xl animate-fade-in">
            {/* Step Indicator */}
            <div className="mb-8">
              <StepDots totalSteps={4} currentStep={currentStep} />
            </div>

            {/* Routes */}
            <Routes>
              <Route path="/" element={<Navigate to="/signup/step/1" replace />} />
              <Route
                path="/step/1"
                element={
                  <Step1_Company
                    data={formData}
                    onNext={(data) => {
                      updateFormData(data);
                      goToStep(2);
                    }}
                  />
                }
              />
              <Route
                path="/step/2"
                element={
                  <Step2_Role
                    data={formData}
                    onNext={(data) => {
                      updateFormData(data);
                      goToStep(3);
                    }}
                    onBack={() => goToStep(1)}
                  />
                }
              />
              <Route
                path="/step/3"
                element={
                  <Step3_Endpoints
                    data={formData}
                    onNext={(data) => {
                      updateFormData(data);
                      goToStep(4);
                    }}
                    onBack={() => goToStep(2)}
                  />
                }
              />
              <Route
                path="/step/4"
                element={
                  <Step4_Password
                    data={formData}
                    onBack={() => goToStep(3)}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
