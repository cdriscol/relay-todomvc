// @flow
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

import AddTodoMutation from '../mutations/AddTodoMutation';
import TodoListFooter from './TodoListFooter';
import TodoTextInput from './TodoTextInput';

import type { TodoApp_viewer } from './__generated__/TodoApp_viewer.graphql';

type Props = {
	viewer: TodoApp_viewer,
	children: any,
	relay: any
};

class TodoApp extends React.Component<Props> {
  onNewTodoSave = text => {
    const { relay, viewer } = this.props;

    AddTodoMutation.commit(relay.environment, viewer, text);
  };

  render() {
    const { viewer, children } = this.props;

    return (
      <div data-framework="relay">
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <TodoTextInput
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
              onSave={this.onNewTodoSave}
            />
          </header>

          {children}

          <TodoListFooter viewer={viewer} />
        </section>

        <footer className="info">
          <p>Double-click to edit a todo</p>
          <p>
            Adapted by <a href="http://fashionablenonsense.com/">@jimmy_jia</a>{' '}
            from work by the{' '}
            <a href="https://facebook.github.io/relay/">Relay team</a>
          </p>
          <p>
            Part of <a href="http://todomvc.com">TodoMVC</a>
          </p>
        </footer>
      </div>
    );
  }
}

export default createFragmentContainer(
  TodoApp,
  graphql`
    fragment TodoApp_viewer on User {
      id
      ...TodoListFooter_viewer
    }
  `,
);
