1. What is the difference between Component and PureComponent? Give
   an example where it might break my app.

   A: PureComponent implements shouldComponentUpdate with a shallow
   prop and state comparison. If your component's render function
   renders the same result given the same props and state, you can
   use PureComponent for a performance boost in some cases. It might break
   your app if, for example, the PureComponent can't detect changes in
   deeply nested objects, resulting in the component not updating when
   it should.

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

   A: If a component is subscribed to context, it will
   re-render whenever the context changes. If the component is also
   using shouldComponentUpdate, it might not re-render when it should, because
   shouldComponentUpdate doesn't have access to the context, like nextProps and nextState.

3. Describe 3 ways to pass information from a component to its PARENT.

   A: 1. Usins callback functions. 2. Using global state. 3. Using refs. 4. Using useImperativeHandler.

4. Give 2 ways to prevent components from re-rendering.

   A: 1. Use memo. 2. Use PureComponent.

5. What is a fragment and why do we need it? Give an example where it might
   break my app.

   A: A fragment is a component that doesn't render any HTML, but
   allows you to return multiple elements from a component's render
   function. It might break your app in some edge cases, like with styles.

6. Give 3 examples of the HOC pattern.

   A: 1. withDataFetch. 2. withAuth. 3. withLoading. 4. withLogging.

7. What's the difference in handling exceptions in promises, callbacks
   and async...await?

   A: Promises uses resolve and reject with try/catch. Callbacks uses 'error-first' pattern. Async/await uses try/catch.

8. How many arguments does setState take and why is it async.

   A: setState takes two arguments, the first one being the new state, and the second one being a callback function. It's async because it's batched for performance reasons.

9. List the steps needed to migrate a Class to Function Component.

   A: Convert the Class to a Function, migrate state with useState, replace lifecycle with useEffect, convert refs, handle methods, convert context, handle props, write tests.

10. List a few ways styles can be used with components.

    A: 1. Inline styles. 2. CSS modules. 3. CSS-in-JS. 4. Some ui lib. 5. Tailwind.

11. How to render an HTML string coming from the server.

    A: Use dangerouslySetInnerHTML.
