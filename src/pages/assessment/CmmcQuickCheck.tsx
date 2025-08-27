import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CheckCircle, AlertTriangle, ArrowRight, Clock, Info } from 'lucide-react';

const CmmcQuickCheck = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'solo';
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: 'q1',
      question: 'Do you limit system access to authorized users only?',
      control: 'AC.L1-3.1.1',
      category: 'Access Control'
    },
    {
      id: 'q2', 
      question: 'Do you use approved software on your systems?',
      control: 'CM.L1-3.4.9',
      category: 'Configuration Management'
    },
    {
      id: 'q3',
      question: 'Do you identify users before allowing system access?',
      control: 'IA.L1-3.5.1',
      category: 'Identification & Authentication'
    },
    {
      id: 'q4',
      question: 'Do you physically protect media containing Federal Contract Information?',
      control: 'MP.L1-3.8.3',
      category: 'Media Protection'
    },
    {
      id: 'q5',
      question: 'Do you sanitize media before disposal or reuse?',
      control: 'MP.L1-3.8.3',
      category: 'Media Protection'
    },
    {
      id: 'q6',
      question: 'Do you screen personnel before authorizing access?',
      control: 'PS.L1-3.9.1',
      category: 'Personnel Security'
    },
    {
      id: 'q7',
      question: 'Do you limit physical access to facilities and systems?',
      control: 'PE.L1-3.10.1',
      category: 'Physical Protection'
    },
    {
      id: 'q8',
      question: 'Do you protect information during transmission?',
      control: 'SC.L1-3.13.8',
      category: 'System Protection'
    },
    {
      id: 'q9',
      question: 'Do you identify and correct system flaws?',
      control: 'SI.L1-3.14.1',
      category: 'System Integrity'
    },
    {
      id: 'q10',
      question: 'Do you provide protection from malicious code?',
      control: 'SI.L1-3.14.2',
      category: 'System Integrity'
    }
  ];

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateResults = () => {
    const yesCount = Object.values(answers).filter(answer => answer === 'yes').length;
    const totalQuestions = questions.length;
    const score = Math.round((yesCount / totalQuestions) * 100);
    
    let level1Ready = false;
    const recommendations = [];
    
    if (score >= 90) {
      level1Ready = true;
      recommendations.push('You appear ready for CMMC Level 1 certification');
    } else if (score >= 70) {
      recommendations.push('You are close to CMMC Level 1 readiness with some gaps to address');
    } else {
      recommendations.push('Significant preparation needed for CMMC Level 1 compliance');
    }

    return {
      score,
      level1Ready,
      recommendations,
      completedQuestions: Object.keys(answers).length,
      totalQuestions
    };
  };

  const results = calculateResults();

  const handleViewDetailedAssessment = () => {
    const params = new URLSearchParams({
      mode,
      level: '1',
      quickCheckScore: results.score.toString()
    });
    navigate(`/assessment/level-1?${params}`);
  };

  const handleCompleteQuickCheck = () => {
    if (results.completedQuestions < results.totalQuestions) {
      toast.error('Please answer all questions', 'Complete all questions to see your results');
      return;
    }

    navigate('/assessment/results', {
      state: {
        type: 'quick-check',
        score: results.score,
        level1Ready: results.level1Ready,
        mode,
        answers
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">CMMC Level 1 Quick Check</h1>
          <p className="text-muted-foreground">
            Quick assessment of your readiness for CMMC Level 1 certification
          </p>
          <div className="mt-2 flex items-center gap-4 text-sm">
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 px-2 py-1 rounded-full">
              {mode === 'solo' ? 'Solo Mode' : 'Team Mode'}
            </span>
            <span className="text-muted-foreground">
              <Clock className="h-4 w-4 inline mr-1" />
              ~10 minutes
            </span>
          </div>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {results.completedQuestions}/{results.totalQuestions}
              </span>
            </div>
            <div className="w-full bg-muted h-2 rounded-full">
              <div 
                className="bg-primary h-2 rounded-full transition-all" 
                style={{ width: `${(results.completedQuestions / results.totalQuestions) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Questions */}
        <div className="space-y-4 mb-8">
          {questions.map((question, index) => (
            <Card key={question.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                        {question.control}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 px-2 py-1 rounded">
                        {question.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">{question.question}</h3>
                    
                    <div className="flex gap-3">
                      <Button
                        variant={answers[question.id] === 'yes' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleAnswer(question.id, 'yes')}
                        className="flex items-center"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Yes
                      </Button>
                      <Button
                        variant={answers[question.id] === 'no' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleAnswer(question.id, 'no')}
                        className="flex items-center"
                      >
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        No
                      </Button>
                      <Button
                        variant={answers[question.id] === 'partial' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleAnswer(question.id, 'partial')}
                        className="flex items-center"
                      >
                        Partially
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Results Preview */}
        {results.completedQuestions > 5 && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{results.score}%</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Current Score</h3>
                  <p className="text-muted-foreground">
                    {results.level1Ready ? 'On track for Level 1 readiness' : 'Additional work needed for Level 1'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button 
            onClick={handleCompleteQuickCheck}
            disabled={results.completedQuestions < results.totalQuestions}
            size="lg"
          >
            Complete Quick Check
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          {results.completedQuestions >= 5 && (
            <Button 
              variant="outline" 
              size="lg"
              onClick={handleViewDetailedAssessment}
            >
              Start Detailed Assessment
            </Button>
          )}
        </div>

        {/* Info */}
        <Card className="mt-8 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Next Steps</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  This quick check evaluates basic CMMC Level 1 readiness. For comprehensive assessment 
                  and implementation planning, continue to the detailed assessment which covers all 110 
                  NIST SP 800-171 controls required for Level 2 compliance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CmmcQuickCheck;