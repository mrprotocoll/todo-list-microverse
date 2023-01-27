import {update} from '../modules/__mock__/editMock';

describe("Edit task", () => {
    document.body.innerHTML = `
    <ul class="todo-list" id="todo-list">
        <li class="task" data-id="1">Task 1</li>
        <li class="task" data-id="2">Task 2</li>
        <li class="task" data-id="3">Task 3</li>
    </ul>
    <input class="input-task" value="">`;

    const tasksArr = [
      {
        index: 1,
        description: 'Task 1',
        completed: false,
      },
      {
        index: 2,
        description: 'Task 2',
        completed: false,
      },
      {
        index: 3,
        description: 'Task 3',
        completed: true,
      },
    ];
    
    const editIndex = 1

    const inputValue = "Edited Task"

    // update localstorage and array
    const edit = update(tasksArr,editIndex,inputValue)

    const editedTask = tasksArr[editIndex - 1];

    // test if input is empty
    test("check if input value is empty", () => {
      expect(inputValue).not.toEqual("")
      expect(tasksArr[editIndex - 1].description).toBe('Edited Task');
    })

    // test if item is edited
    test("update task and localstorage", () => {
      expect(edit).toEqual({
          index: editedTask.index,
          description: editedTask.description,
          completed: editedTask.completed
      });
    })

})