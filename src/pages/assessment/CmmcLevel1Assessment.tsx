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
import { toast } from '../../lib/toast';
import { Link } from 'react-router-dom';

const CmmcLevel1Assessment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'solo';
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});

  const level1Questions = [
    {
      id: 'AC.L1-3.1.1',
      category: 'Access Control',
      title: 'Limit information system access to authorized users',
      description: 'Limit information system access to authorized users, processes acting on behalf of authorized users, or devices (including other information systems).',
      guidance: 'This control focuses on ensuring only authorized entities can access your information systems.',
      questions: [
        {
          text: 'Do you have documented procedures for granting system access?',
          type: 'yes_no_partial'
        },
        {
          text: 'Are all user accounts associated with authorized users?',
          type: 'yes_no_partial'
        }
      ]
    },
    {
      id: 'AC.L1-3.1.2',
      category: 'Access Control',
      title: 'Limit information system access to authorized transactions',
      description: 'Limit information system access to the types of transactions and functions that authorized users are permitted to execute.',
      guidance: 'Users should only be able to perform transactions they are authorized to execute.',
      questions: [
        {
          text: 'Do you restrict user access to only necessary system functions?',
          type: 'yes_no_partial'
        },
        {
          text: 'Are transaction types limited based on user roles?',
          type: 'yes_no_partial'
        }
      ]
    },
    {
      id: 'IA.L1-3.5.1',
      category: 'Identification and Authentication',
      title: 'Identify information system users',
      description: 'Identify information system users, processes acting on behalf of users, or devices.',
      guidance: 'All users and processes must be uniquely identified before being granted access.',
      questions: [
        {
          text: 'Do you uniquely identify all users before granting access?',
          type: 'yes_no_partial'
        },
        {
          text: 'Are system processes properly identified and authenticated?',
          type: 'yes_no_partial'
        }
      ]
    },
    {
      id: 'IA.L1-3.5.2',
      category: 'Identification and Authentication',
      title: 'Authenticate users',
      description: 'Authenticate (or verify) the identities of those users, processes, or devices, as a prerequisite to allowing access to organizational information systems.',
      guidance: 'Authentication verifies that users are who they claim to be.',
      questions: [
        {
          text: 'Do you authenticate all users before allowing system access?',
          type: 'yes_no_partial'
        },
        {
          text: 'Are authentication mechanisms regularly reviewed and updated?',
          type: 'yes_no_partial'
        }
      ]
    }
  ];

  const currentQuestionData = level1Questions[currentQuestion];

  const handleResponse = (questionIndex: number, response: string) => {
    const questionId = `${currentQuestionData.id}_q${questionIndex}`;
    setResponses(prev => ({
      ...prev,
      [questionId]: response
    }));
  };

  const handleNext = () => {
    if (currentQuestion < level1Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Complete assessment
      navigate('/assessment/results', {
        state: {
          type: 'level-1-assessment',
          responses,
          mode,
          level: 1
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
          <h1 className="text-3xl font-bold text-foreground mb-2">CMMC Level 1 Assessment</h1>
          <p className="text-muted-foreground">
            Detailed assessment of CMMC Level 1 foundational practices
          </p>
          <div className="mt-2 flex items-center gap-4 text-sm">
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 px-2 py-1 rounded-full">
              {mode === 'solo' ? 'Solo Mode' : 'Team Mode'}
            </span>
            <span className="text-muted-foreground">
              <Clock className="h-4 w-4 inline mr-1" />
              Level 1 - Foundational
            </span>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Assessment Progress</span>
              <span className="text-sm text-muted-foreground">
                {currentQuestion + 1} of {level1Questions.length} controls
              </span>
            </div>
            <div className="w-full bg-muted h-2 rounded-full">
              <div 
                className="bg-primary h-2 rounded-full transition-all" 
                style={{ width: `${((currentQuestion + 1) / level1Questions.length) * 100}%` }}
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
            Control {currentQuestion + 1} of {level1Questions.length}
          </span>
          
          <Button 
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {currentQuestion === level1Questions.length - 1 ? 'Complete Assessment' : 'Next Control'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CmmcLevel1Assessment;