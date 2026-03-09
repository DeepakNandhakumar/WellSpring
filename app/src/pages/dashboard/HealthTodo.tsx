import React, { useState, useEffect } from 'react';
import { CheckSquare, Plus, Trash2, Calendar, Trophy, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { getTodos, saveTodos, generateId } from '../../utils/helpers';
import { toast } from 'sonner';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

const HealthTodo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = () => {
    if (!newTodo.trim()) {
      toast.error('Please enter a task');
      return;
    }

    const todo: Todo = {
      id: generateId(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([todo, ...todos]);
    setNewTodo('');
    toast.success('Task added successfully');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success('Task deleted');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  const suggestedTasks = [
    'Drink 8 glasses of water',
    'Take a 30-minute walk',
    'Practice meditation for 10 minutes',
    'Eat 5 servings of fruits and vegetables',
    'Get 7-8 hours of sleep',
    'Do stretching exercises',
    'Avoid sugary drinks',
    'Take prescribed medications',
  ];

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
            <CheckSquare className="w-8 h-8 mr-3 text-teal-500" />
            Health Todo Tracker
          </h1>
          <p className="text-gray-600">
            Track your daily health tasks and build healthy habits one step at a time.
          </p>
        </div>

        {/* Progress Card */}
        <Card className="border-0 shadow-md mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
                <span className="font-semibold text-gray-800">Daily Progress</span>
              </div>
              <span className="text-2xl font-bold text-[#1e88e5]">
                {completedCount}/{todos.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-[#1e88e5] to-[#43a047] h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {progress === 100
                ? 'Congratulations! All tasks completed! 🎉'
                : `${Math.round(progress)}% completed - Keep going!`}
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Todo List */}
          <div className="md:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Target className="w-5 h-5 mr-2 text-[#1e88e5]" />
                  My Health Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Add Todo */}
                <div className="flex space-x-2 mb-6">
                  <Input
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a new health task..."
                  />
                  <Button
                    onClick={addTodo}
                    className="bg-gradient-to-r from-[#1e88e5] to-[#43a047] text-white"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>

                {/* Todo Items */}
                <div className="space-y-2">
                  {todos.length === 0 ? (
                    <div className="text-center py-8">
                      <CheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No tasks yet. Add one above!</p>
                    </div>
                  ) : (
                    todos.map((todo) => (
                      <div
                        key={todo.id}
                        className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                          todo.completed ? 'bg-green-50' : 'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={todo.completed}
                            onCheckedChange={() => toggleTodo(todo.id)}
                          />
                          <span
                            className={`${
                              todo.completed
                                ? 'line-through text-gray-400'
                                : 'text-gray-700'
                            }`}
                          >
                            {todo.text}
                          </span>
                        </div>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Suggested Tasks */}
          <div>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-[#fb8c00]" />
                  Suggested Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {suggestedTasks.map((task, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setNewTodo(task);
                      }}
                      className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors text-sm text-gray-700"
                    >
                      + {task}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTodo;
