var page = {};

page.formatProduct = function(product, productTemplate) {
    var self          = this;
    var template      = productTemplate;
    self.description  = product.description;
    self.photo        = product.photos.medium_half;
    self.title        = product.name;
    self.tagline      = product.tagline;
    self.url          = product.url;
    self.htmlview     = template.replace('{image}', self.photo).replace('{title}', self.title).replace('{tagline}', self.tagline).replace('{url}', self.url).replace('{description}', self.description);
    return self;
  }
  
page.bindCloseButton = function() {
  $('.product-container > .close').on('click',function(evt) {
    var productContainer = $(this).parent()
    productContainer.addClass('closed');
    setTimeout(function(){
      productContainer.hide();
    },500);
  });
}

page.productsLoaded = function() {
  page.bindCloseButton();
  setTimeout(function(){
    $('.loading').css('opacity',0);
    setTimeout(function() {
      $('.loading').hide();
    },500);
  },1500);
}

$.when($.get('product-template.html'), $.getJSON('data.json')).done(function(templateData, productData) {
  page.products = '';
  for(i=0; i<productData[0].sales.length ; i++){
    var formattedProduct = page.formatProduct(productData[0].sales[i], templateData[0]);
    page.products += formattedProduct.htmlview;
  }
  $("#content").append(page.products);
  page.productsLoaded();
});