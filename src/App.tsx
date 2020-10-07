import React from 'react';
import Collapse from './components/Collapse';


const App: React.FC = () => {
  return (
    <main className="app">
      test
      <Collapse title="Test something">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur fuga, facilis autem similique maiores quaerat nihil optio debitis nam at fugiat veniam aut quas sit molestias, facere officiis perspiciatis dolores?</p>
      </Collapse>
      <Collapse title="Test something">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur fuga, facilis autem similique maiores quaerat nihil optio debitis nam at fugiat veniam aut quas sit molestias, facere officiis perspiciatis dolores?</p>
      </Collapse>
    </main>
  );
}

export default App;
