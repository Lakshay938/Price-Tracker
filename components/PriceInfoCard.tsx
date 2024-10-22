interface Props {
    title:string
    value:string
}
export const PriceInfoCard = ({title,value}:Props) => {
  return (
    <div className={`price-info_card border-l`}>
        <p className="text-[13px]  text-center text-black-100">{title}</p>
        <div className="flex gap-1 justify-center">
            <p className="text-[20px]  text-center text-bold text-secondary">{value}</p>
        </div>
    </div> 

  )
}

export default PriceInfoCard;
