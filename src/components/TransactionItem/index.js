// Write your code here
import './index.css'

const TransactionItem = props => {
  const {details, onDeleteTransaction} = props
  const {title, amount, type, id} = details

  const onDeleteButton = () => {
    onDeleteTransaction(id, type)
  }

  return (
    <li className="list-item">
      <p>{title}</p>
      <p>{amount}</p>
      <p>{type}</p>
      <button type="button" onClick={onDeleteButton}>
        <img
          data-testid="delete"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
