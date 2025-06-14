(function() {
    const container = document.getElementById('products');

    items.forEach(item => {
        const product = document.createElement('div');
        product.className = 'product';

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;

        const title = document.createElement('h3');
        title.textContent = item.name;

        const desc = document.createElement('p');
        desc.textContent = item.description;

        const link = document.createElement('a');
        link.href = item.link;
        link.textContent = 'Buy on Amazon';
        link.target = '_blank';
        link.className = 'button';

        product.appendChild(img);
        product.appendChild(title);
        product.appendChild(desc);
        product.appendChild(link);

        container.appendChild(product);
    });
})();
