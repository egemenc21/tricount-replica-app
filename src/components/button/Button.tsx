import { ButtonHTMLAttributes } from 'react'
import './button-styles.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: string
}

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
  logOut: 'log-out',
  addExpense: 'add-expense',
}

function BaseButton({
  children,
  onClick,
  type = 'submit'
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="btn base-btn" onClick={onClick} type={type}>
      {children}
    </button>
  )
}
function GoogleSignInButton({
  children,
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="btn google-btn" type="submit">
      {children}
    </button>
  )
}
function InvertedButton({ children }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="btn inverted-btn" type="submit">
      {children}
    </button>
  )
}
function LogOutButton({ children }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="btn log-out-btn" type="submit">
      {children}
    </button>
  )
}
function AddExpenseButton({
  children,
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="btn add-expense-btn" type="submit">
      {children}
    </button>
  )
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    [BUTTON_TYPE_CLASSES.logOut]: LogOutButton,
    [BUTTON_TYPE_CLASSES.addExpense]: AddExpenseButton,
  })[buttonType]

function Button({ children, onClick, buttonType,type }: ButtonProps) {
  const CustomButton = getButton(buttonType)
  return <CustomButton onClick={onClick} type={type}>{children}</CustomButton>
}

export default Button
