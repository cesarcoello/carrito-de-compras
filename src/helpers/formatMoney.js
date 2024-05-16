const formatMoney = amount => Number(amount).toLocaleString('HNL',{currency: 'HNL' , style: 'currency'})

export {
    formatMoney
}