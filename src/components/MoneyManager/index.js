import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    optionId: transactionTypeOptions[0].optionId,

    transactionsList: [],
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  onAddTransactionHistory = event => {
    event.preventDefault()
    const {title, amount, optionId} = this.state

    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )

    const {displayText} = typeOption

    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parseInt(amount),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      title: '',
      amount: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onDeleteTransaction = id => {
    const {transactionsList} = this.state
    const filteredTransactionList = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )
    this.setState({transactionsList: filteredTransactionList})
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })

    return expensesAmount
  }

  render() {
    const {title, amount, transactionsList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="container-1">
            <h1>Hi, Richard</h1>
            <p>
              Welcome back to your{' '}
              <span className="money-manager">Money Manager</span>
            </p>
          </div>
          <div className="container-2">
            <MoneyDetails
              balanceAmount={balanceAmount}
              incomeAmount={incomeAmount}
              expensesAmount={expensesAmount}
            />
          </div>
          <div className="container-3">
            <form
              className="form-container"
              onSubmit={this.onAddTransactionHistory}
            >
              <h1>Add Transaction</h1>
              <label htmlFor="title">TITLE</label>
              <br />
              <input
                value={title}
                onChange={this.onChangeTitle}
                className="input-elements"
                id="title"
                placeholder="TITLE"
              />
              <br />
              <label htmlFor="amount">Amount</label>
              <br />
              <input
                value={amount}
                onChange={this.onChangeAmount}
                className="input-elements"
                id="amount"
                placeholder="AMOUNT"
              />
              <br />
              <label htmlFor="type">Type</label>
              <br />
              <select
                className="input-elements"
                onChange={this.onChangeOptionId}
              >
                {transactionTypeOptions.map(each => (
                  <option value={each.optionId} key={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
              <br />
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <div className="history-container">
              <h1>History</h1>
              <div className="parameters-cont">
                <p className="parameter">Title</p>
                <p className="parameter">Amount</p>
                <p className="parameter">Type</p>
              </div>
              <ul className="unordered-list-container">
                {transactionsList.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    details={eachTransaction}
                    onDeleteTransaction={this.onDeleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
