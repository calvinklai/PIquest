---
title: Creating a task
description: All you need to know in order to create your own task.
---

This document will walk you through all you need to know in order to create a task. Anything appearing here is relevant to all types of tasks.

### The Wrapper

Each task consists of a single javascript file, which is a simple text file with a `js` extenssion. The file should be setup with some code at the begining and the end, this code is used by the player to register the task. 

First, all your code should be wrapped by a define statement (if you want to understand more about how this work you can read up on [AMD modules](http://requirejs.org/docs/whyamd.html)):

```js
define(['taskAPI'],function(taskAPI){
    // all sorts of code...
});
```

Here `taskAPI` should be replaced with whatever type of task you are creating, be it `pipAPI`, `questAPI` or any other API available within the system.

The APIs for each of the tasks are constructors, so in order to use the API you always have to create a new API object first (API is an arbitrary name of course, you can call it however you like...):

```js
var API = new taskAPI();
```

After creating the API, you can start putting your task together, we'll see how to do that in a moment. But before getting to the creation of the task itself, we'll note that at the very end of the task you need to return the `API.script`. This exports the task you have created and allows the the task to be registered. It looks something like this:

```js
return API.script;
```

All taken into account this is the structure of any script you create:

```js
define(['taskAPI'],function(taskAPI){
    var API = new taskAPI();
    // Use the API to create your task here...
    return API.script;
});
```

### The sequence
Tasks can be seen a series of frames. Each frame includes some type of interaction with the user. It may be a questionnaire page, a time sensitive trial or even a simple message - depends which type of task you are using. Each of the interaction frames is described by a single object (that may include sub objects that represent sub frames...). You can learn all about the properties that the objects use to describe their tasks in each of their individual API documentation sections.

In order to register an object with the task we need to add it to the `sequence`. The sequence is an array of objects that get activate sequentially when the task is activated.

We'll use piQuest for this example, where each object represents a page with an array of questions:

```js
API.addSequence([
    // page 1
    {
        header: 'header 1',
        questions: [{stem:'What is you\'r first name?'}]
    },
    // page 2
    {
        header: 'header 2',
        questions: [{stem:'What is you\'r last name?'}]
    }
]);
```

This will tell piQuest to first activate page 1 and then activate page 2. The sequence works in a similar way for all of our tasks, just add in objects and they'll be activated one after another.

Of course a simple sequential sequence is rarely what you'll need. All sequences support some powerful tools for enriching the way your sequence works. These are described in detail in the [sequencer section](sequencer.html), here we'll only touch on some basic randomization (using the mixer) and abstraction (using inheritance). After you get the basic idea you should really go there and get to know the sequencer better.

### Basic Randomization
All sequences support a special type of object called a mixer which holds several regular objects and affect the way they are activated. It can reorder them, chose among them and even skip them. Here and now, we'll only see the mixer used for randomization.

The randomization mixer has the following structure:
```js
{
    mixer: 'random',    // declare this object as a randomization mixer
    data: [obj1, obj2]  // the objects to be randomized
}
```

So if we want to take randomize the order in which our pages got activated we'd write something like this:

```js
API.addSequence([
    {
        mixer: 'random',
        data: [
             // page 1
             {
                header: 'header 1',
                questions: [{stem:'What is you\'r first name?'}]
            },
            // page 2
            {
                header: 'header 2',
                questions: [{stem:'What is you\'r last name?'}]
            }
        ]
    }
]); 
```

Instead of always presenting page 2 after page 1, the sequencer will now randomize the order in which they are presented and present page 2 first half of the time. The full documentation for the mixer is [right here](sequencer.html#mixer).

### Basic abstraction
Many times we want to create several objects with mostly similar properties. For instance we may want to create a set of questions that have many common properties but differ only in some minor way. In this case we will see how to create a template for likert type questions that can be used across pages.

The tool we offer to deal with that is inheritance. Each object that we use can inherit some of its properties from some pre-registered objects. We will first see how to register objects, then how to inherit from him.

Each API has a function that allows registering sets of objects that can later be inherited. There is a separate function for each type of object. We will first register a likert type question set:

```js
API.addQuestionsSet('likert', [
    {
        type: 'selectOne',
        answers: [
            'Strongly disagree',
            'Disagree',
            'Neither agree nor disagree',
            'Agree',
            'Strongly agree'
        ]
    }
]);
```

The first argument for the function is the name of the set to register, in this case `'likert'`. The second argument is an array of elements to register into the set.

Next, lets see how we can use the registered objects from within the sequence. Each objects has a special property `inherit` that activates the inheritance system. In our case setting `inherit` to 'likert' will tell the object to inherit from the likert set. Inheritance means that that the child object inherits all the properties of the parent object.

```js
API.addSequence([
    // page 1
    {
        questions: [{stem:'I like cake.', inherit: 'likert'}]
    },
    // page 2
    {
        questions: [{stem:'I like chicken.', inherit: 'likert'}]
    }
]);
```

Each of the questions in this questionnaire inherit the likert set and with it all of the properties already defined into the likert object. This is useful in order to have shorter and more readable scripts as well as to allow changing scripts from one central place.