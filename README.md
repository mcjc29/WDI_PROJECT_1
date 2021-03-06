# WDI-30 Project 1 - True || False

Two weeks into the course were given four days to build an in-browser game using HTML, CSS and JavaScript (jQuery library used). Rather then replicating an existing game, I took inspiration from studying formal logic at university and created True || False (a program to solve expressions using logical operators).


##### [Visit website](https://logical-operators.herokuapp.com)

---

###### You are asked to submit a list of names to randomly generate the student to solve the expression.

<img src="https://i.imgur.com/YkhzcQ7.png" width="700">

<img src="https://i.imgur.com/oN1uxEi.png" width="700">

###### Using Math.random, a sub-expression is randomly created and bracketed. An arbitrary number of these sub-expressions are pushed to an array. This is looped over, the sub-expressions concatenated with the random assignment of the logical operators (conjunction and disjunction) where some sub-expressions have been negated.

######  The expression is then printed out on the screen one character at a time.

<img src="https://i.imgur.com/2Qyq8he.png" width="700">


###### The exciting part was attempting to show the solution to the expression as a student would work it out themselves, determining the truth value of a sub-expression one at a time.

<img src="https://i.imgur.com/nsUpLnx.png" width="700">

###### This proved very challenging because once a sub-expression is solved the indices of the other characters in the array had shifted minus the expression and it's brackets and added the insertion of the truth value.

---

I really enjoyed this project in particular battling with the logic problem of being able to display the steps of the solution to the expression. It provided a great learning experience of how to break down a problem and attempt to solve it in various ways.
