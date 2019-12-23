import React from "react";
import { AddToDoField } from "./AddToDoField";
import { ToDoListPanel } from "./ToDoListPanel";
import arrayMove from "array-move";

const toDoListItems = [
  {
    title: "first to do",
    checked: false
  },
  {
    title: "second to do",
    checked: true
  }
];

export default class ToDoListContainer extends React.Component {
  state = {
    newAddToDoTitle: "",
    itemsList: toDoListItems,
    errors: {}
  };

  handleSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ itemsList }) => ({
      itemsList: arrayMove(itemsList, oldIndex, newIndex)
    }));
  };

  handleAddToDoButtonClick = item => {
    console.log(item);
    const newListItem = {
      title: item,
      checked: false
    };
    this.setState(state => {
      const itemsNewList = this.state.itemsList.concat(newListItem);
      return {
        itemsList: itemsNewList
      };
    });
  };

  handleToDoValueChange = title => {
    this.setState(state => {
      const itemsNewList = this.state.itemsList.map(item => {
        const newItem = {
          title: item.title,
          checked: !item.checked
        };
        if (title === item.title) {
          return newItem;
        } else {
          return item;
        }
      });
      return {
        itemsList: itemsNewList
      };
    });
  };

  handleRemoveToDoButtonClick = title => {
    this.setState(state => {
      const itemsNewList = this.state.itemsList.filter(
        item => item.title !== title
      );
      return {
        itemsList: itemsNewList
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        <h1>To Do List</h1>
        <AddToDoField onAddToDoButtonClick={this.handleAddToDoButtonClick} />
        <ToDoListPanel
          toDoListItems={this.state.itemsList}
          onToDoValueChange={this.handleToDoValueChange}
          onRemoveToDoButtonClick={this.handleRemoveToDoButtonClick}
          onSortEnd={this.handleSortEnd}
        />
      </React.Fragment>
    );
  }
}
