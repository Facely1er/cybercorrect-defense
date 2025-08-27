import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  AlertTriangle, 
  Shield,
  Clock,
  Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CmmcLevel2Assessment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'solo';
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});

  const level2Questions = [
    {
      id: 'AC.L2-3.1.3',
      category: 'Access Control',
      title: 'Control CUI flow',
      description: 'Control the flow of CUI in accordance with approved authorizations.',
      guidance: 'Organizations must implement controls to ensure CUI flows only to authorized locations and users.',
      questions: [
        {
          text: 'Do you have documented procedures for controlling CUI flow?',
          type: 'yes_no_partial'
        },
        {
          text: 'Are CUI markings and handling requirements enforced?',
          type: 'yes_no_partial'
        }
      ]
    },
    {
      id: 'AC.L2-3.1.4',
      category: 'Access Control',
      title: 'Separate duties',
      description: 'Separate the duties of individuals to reduce the risk of malevolent activity without collusion.',
      guidance: 'Implement separation of duties to prevent single points of failure in critical processes.',
      questions: [
        {
          text: 'Are critical functions divided among different individuals?',
          type: 'yes_no_partial'
        },
        {
          text: 'Do you have policies defining separation of duties?',
          type: 'yes_no_partial'
        }
      ]
    },
    {
      id: 'AC.L2-3.1.5',
      category: 'Access Control',
      title: 'Employ least privilege',
      description: 'Employ the principle of least privilege, including for specific security functions and privileged accounts.',
      guidance: 'Users should only have the minimum access necessary to perform their job functions.',
      questions: [
        {
          text: 'Do you implement least privilege access controls?',
          type: 'yes_no_partial'
        },
        {
          text: 'Are privileged accounts regularly reviewed and justified?',
          type: 'yes_no_partial'
        }
      ]
    },
    {
      id: 'AT.L2-3.2.1',
      category: 'Awareness and Training',
      title: 'Provide security awareness training',
      description: 'Ensure that managers, system administrators, and users of organizational information systems are made aware of the security risks associated with their activities.',
      guidance: 'Regular security awareness training helps reduce human-related security risks.',
      questions: [
        {
          text: 'Do you provide regular security awareness training?',
          type: 'yes_no_partial'
        },
        {
          text: 'Is training content updated to address current threats?',
          type: 'yes_no_partial'
        }
      ]
    }
  ];

  const currentQuestionData = level2Questions[currentQuestion];

  const handleResponse = (questionIndex: number, response: string) => {
    const questionId = `${currentQuestionData.id}_q${questionIndex}`;
    setResponses(prev => ({
      ...prev,
      [questionId]: response
    }));
  };

  const handleNext = () => {
    if (currentQuestion < level2Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Complete assessment
      navigate('/assessment/results', {
        state: {
          type: 'level-2-assessment',
          responses,
          mode,
          level: 2
        }
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const getResponsesForCurrentControl = () => {
    const responses_for_control = [];
    for (let i = 0; i < currentQuestionData.questions.length; i++) {
      const questionId = `${currentQuestionData.id}_q${i}`;
      responses_for_control.push(responses[questionId]);
    }
    return responses_for_control;
  };

  const canProceed = () => {
    const current_responses = getResponsesForCurrentControl();
    return current_responses.every(response => response !== undefined);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/assessment" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assessment Start
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">CMMC Level 2 Assessment</h1>
          <p className="text-muted-foreground">
            Comprehensive assessment of CMMC Level 2 advanced practices (NIST SP 800-171)
          </p>
          <div className="mt-2 flex items-center gap-4 text-sm">
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 px-2 py-1 rounded-full">
              {mode === 'solo' ? 'Solo Mode' : 'Team Mode'}
            </span>
            <span className="text-muted-foreground">
              <Clock className="h-4 w-4 inline mr-1" />
              Level 2 - Advanced (110 Controls)
            </span>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Assessment Progress</span>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1} of {level2Questions.length} controls (sample)
              </span>
            </div>
            <div className="w-full bg-muted h-2 rounded-full">
              <div 
                className="bg-primary h-2 rounded-full transition-all" 
                style={{ width: `${((currentQuestion + 1) / level2Questions.length) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Current Question */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                  {currentQuestion + 1}
                </div>
                <div>
                  <span className="font-mono text-sm bg-muted text-muted-foreground px-2 py-1 rounded">
                    {currentQuestionData.id}
                  </span>
                  <span className="text-sm bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 px-2 py-1 rounded ml-2">
                    {currentQuestionData.category}
                  </span>
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-3">{currentQuestionData.title}</h2>
              <p className="text-muted-foreground mb-4">{currentQuestionData.description}</p>
              
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">Implementation Guidance</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">{currentQuestionData.guidance}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Questions for this control */}
            <div className="space-y-6">
              {currentQuestionData.questions.map((question, questionIndex) => (
                <div key={questionIndex} className="border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">{question.text}</h3>
                  
                  <div className="flex gap-3">
                    <Button
                      variant={responses[`${currentQuestionData.id}_q${questionIndex}`] === 'yes' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleResponse(questionIndex, 'yes')}
                      className="flex items-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Yes
                    </Button>
                    <Button
                      variant={responses[`${currentQuestionData.id}_q${questionIndex}`] === 'no' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleResponse(questionIndex, 'no')}
                      className="flex items-center"
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      No
                    </Button>
                    <Button
                      variant={responses[`${currentQuestionData.id}_q${questionIndex}`] === 'partial' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleResponse(questionIndex, 'partial')}
                      className="flex items-center"
                    >
                      Partially
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button 
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <span className="text-sm text-muted-foreground">
            Control {currentQuestion + 1} of {level2Questions.length}
          </span>
          
          <Button 
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {currentQuestion === level2Questions.length - 1 ? 'Complete Assessment' : 'Next Control'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Note */}
        <div className="mt-8">
          <Card className="bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-200">Sample Assessment</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    This is a sample of Level 2 assessment questions. The full assessment covers all 110 NIST SP 800-171 controls across 14 control families.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CmmcLevel2Assessment;