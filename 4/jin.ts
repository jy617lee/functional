let shoppingCart: Item[] = [];

// data
interface Item {
    readonly name: string;
    readonly price: number;
}

interface BuyButton {
    readonly item: Item;
    readonly showFreeShippingIcon: () => void;
    readonly hideFreeSHippingIcon: () => void;
}

const FREE_SHIPPING_THRESHOLD = 20;

// calculation
const calcTotalPrice = (shoppingCart: Item[]): number => shoppingCart.reduce((acc, cur) => acc + cur.price, 0)

const addItem = (shoppingCart: Item[], newItem: Item): Item[] => {
    return [...shoppingCart, newItem];
}

const isFreeShipping = (shoppingCart: Item[], item: Item): boolean => calcTotalPrice(shoppingCart) + item.price >= FREE_SHIPPING_THRESHOLD;

const calcTax = (amount: number) => amount * 0.1;

// action
const addItemToCart = (item: Item, newItem: Item) => {
    shoppingCart = addItem(shoppingCart, newItem);
    setCartTotalDom(shoppingCart);
    updateShippingIcons(shoppingCart);
    updateTaxDom(shoppingCart);
}

const setCartTotalDom = (shoppingCart: Item[]) => {
    const totalPrice = calcTotalPrice(shoppingCart);
    // TODO update dom based on total price
}

const updateShippingIcons = (shoppingCart: Item[]) => {
    const buyButtons : BuyButton[] = []; // TODO get buy buttons dom
    buyButtons.forEach((button) => {
        const { item, showFreeShippingIcon, hideFreeSHippingIcon } = button;
        isFreeShipping(shoppingCart, item) ? showFreeShippingIcon() : hideFreeSHippingIcon();
    })
}


const updateTaxDom = (shoppingCart: Item[]) => {
    const totalPrice = calcTotalPrice(shoppingCart);
    const calculatedTax = calcTax(totalPrice);

    // TODO set tax dom based on calculateed tax
}
