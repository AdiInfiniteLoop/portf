import { Component } from 'solid-js';
import { Route } from '@solidjs/router';
import { TerminalLayout } from './components/TerminalLayout';

const App: Component = () => {
  return (
    <Route path="/*" component={TerminalLayout} />
  );
};

export default App;
