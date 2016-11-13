var page = {};

page.getProductTemplate = function(callback,url) {
  $.get('product-template.html', function(data) {
    page.productTemplate = data;
    callback(url);
  });
}

page.getProducts = function(url) {
  page.products = [];
  $.getJSON(url, function(response){
      for(i=0; i<response.sales.length ; i++){
        var newProduct = formatProduct(response.sales[i]);
        page.products.push(newProduct);
        $("#content").append(newProduct.htmlview);
      }
      productsLoaded();
  });
  
  function formatProduct(product) {
    var self          = this;
    var template      = page.productTemplate;
    self.description  = product.description;
    self.photo        = product.photos.medium_half;
    self.title        = product.name;
    self.tagline      = product.tagline;
    self.url          = product.url;
    self.htmlview     = template.replace('{image}', self.photo).replace('{title}', self.title).replace('{tagline}', self.tagline).replace('{url}', self.url).replace('{description}', self.description);
    return self;
  }
  
  function bindCloseButton() {
    $('.product-container > .close').on('click',function(evt) {
      var productContainer = $(this).parent()
      productContainer.addClass('closed');
      setTimeout(function(){
        productContainer.hide();
      },500);
    });
  }
  function productsLoaded() {
    bindCloseButton();
    setTimeout(function(){
      $('.loading').css('opacity',0);
      setTimeout(function() {
        $('.loading').hide();
      },500);
    },1500);
  }
}

page.getProductTemplate(page.getProducts,'data.json');