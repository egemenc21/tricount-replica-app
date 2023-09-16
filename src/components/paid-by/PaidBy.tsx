interface PaidByProps {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  paidBy: string
  participators: string[]
}

function PaidBy({ handleChange, paidBy, participators }: PaidByProps) {
  return (
    <label>
      <div>Paid by:</div>
      <select
        name="paidBy"
        className="paidBy"
        onChange={handleChange}
        value={paidBy}
        required
      >
        {participators.map((participant) => (
          <option key={participant} value={participant}>
            {participant}
          </option>
        ))}
      </select>
    </label>
  )
}

export default PaidBy
