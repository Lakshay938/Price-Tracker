interface Props {
    title:string
    value:string
}
export const PriceInfoCard = ({title,value}:Props) => {
  return (
    <div className={`price-info_card border-l`}>
        <p className="text-base text-black-100">{title}</p>
        <div className="flex gap-1">
            <p className="text-2xl font-bold text-secondary">{value}</p>
        </div>
    </div> 

  )
}

export default PriceInfoCard;
