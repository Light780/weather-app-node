import inquirer from 'inquirer'
import 'colors'

const menuOptions = [
  {
    type: 'list',
    name: 'option',
    message: 'What you want to do?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Search City`
      },
      {
        value: 2,
        name: `${'2.'.green} History`
      },
      {
        value: 0,
        name: `${'0.'.green} Exit`
      }
    ]
  }
]

export const inquirerMenu = async () => {
  console.log('=========================='.green)
  console.log('   Select an option'.green)
  console.log('=========================='.green)

  const { option } = await inquirer.prompt(menuOptions)
  return option
}

export const listPlaces = async (lugares = []) => {
  const choices = lugares.map((lugar, i) => {
    const idx = `${i + 1}.`.green

    return {
      value: lugar.id,
      name: `${idx} ${lugar.nombre}`
    }
  })

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancel'
  })

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Select Place:',
      choices
    }
  ]

  const { id } = await inquirer.prompt(preguntas)
  return id
}

export const pause = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Press ${'ENTER'.green} to continue`
    }
  ]
  console.log('\n')
  await inquirer.prompt(question)
}

export const readInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate (value) {
        if (value.length === 0) {
          return 'Please input a value'
        }
        return true
      }
    }
  ]
  const { desc } = await inquirer.prompt(question)
  return desc
}

export const listTaskToDelete = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    const idx = `${index + 1}`.green
    return {
      value: task.id,
      name: `${idx} ${task.desc}`
    }
  })

  choices.unshift({
    value: '0',
    name: `${'0'.green} Cancel`
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Delete Task',
      choices
    }
  ]

  const { id } = await inquirer.prompt(questions)
  return id
}

export const showTasksCheckList = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    const idx = `${index + 1}`.green
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: !!task.completedAt
    }
  })

  const questions = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select',
      choices
    }
  ]

  const { ids } = await inquirer.prompt(questions)
  return ids
}

export const confirm = async (message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]
  const { ok } = await inquirer.prompt(question)
  return ok
}
