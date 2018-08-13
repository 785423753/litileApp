const $filterNullChildren = (children) => {
	return children.filter(child => child != null);
}

export default (data, opt) => {
	const {View, Text, Image, Navigator, Location, Picker} = opt;
	Object.assign(data,{"$str9776661":"share-price-text ","$str93029419":"share-loss","$str47345133":"share-gain","$str84646705":"share-price-unit ","$str67180720":"share-detail-price "}); return new View({style: {}, attr: {},children:$filterNullChildren([new View({style: {}, attr: {"class":"share-container"},children:$filterNullChildren([new View({style: {}, attr: {"class":"share-info"},children:$filterNullChildren([new Text({style: {}, attr: {"class":"share-name","content":(data.name)},children:$filterNullChildren([])}),new Text({style: {}, attr: {"class":"share-code","content":"("+(data.code)+(")")},children:$filterNullChildren([])})])}),new Text({style: {}, attr: {"class":"share-datetime","content":(data.dateTime)},children:$filterNullChildren([])}),new View({style: {}, attr: {"class":"share-price"},children:$filterNullChildren([new Text({style: {}, attr: {"class":(data.$str9776661 + (data.gains < 0 ? data.$str93029419 : data.$str47345133)),"content":(data.price)},children:$filterNullChildren([])}),new Text({style: {}, attr: {"class":(data.$str84646705 + (data.gains < 0 ? data.$str93029419 : data.$str47345133)),"content":(data.unit)},children:$filterNullChildren([])}),new Image({style: {}, attr: {"class":"share-arrow","src":"./images/down.png"},children:$filterNullChildren([])})])}),new View({style: {}, attr: {"class":"share-detail"},children:$filterNullChildren([new Text({style: {}, attr: {"content":"涨跌额:"},children:$filterNullChildren([])}),new Text({style: {}, attr: {"class":(data.$str67180720 + (data.gains < 0 ? data.$str93029419 : data.$str47345133)),"content":(data.gains)},children:$filterNullChildren([])}),new Text({style: {}, attr: {"class":"share-detail-title","content":"涨跌幅:"},children:$filterNullChildren([])}),new Text({style: {}, attr: {"class":(data.$str67180720 + (data.gains < 0 ? data.$str93029419 : data.$str47345133)),"content":(data.gainsPercent)+("%")},children:$filterNullChildren([])}),new Text({style: {}, attr: {"class":"share-detail-title","content":"市值:"},children:$filterNullChildren([])}),new Text({style: {}, attr: {"class":((data.gains < 0 ? data.$str93029419 : data.$str47345133)),"content":"3.13万亿"},children:$filterNullChildren([])})])})])})])});
}