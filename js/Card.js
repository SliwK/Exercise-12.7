// KLASA KANBAN CARD
function Card(id, name, idColumn) {
	var self = this;

	this.id = id;
	this.name = name || 'No name given';
	this.idColumn = idColumn;
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');

		cardDeleteBtn.click(function(){
			self.removeCard();
		});

//edycja nazwy karty
		cardDescription.dblclick(function(){
			self.editCard();
		});

		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription);
		return card;

}

}

Card.prototype = {
	removeCard: function() {
    var self = this;
    $.ajax({
      url: baseUrl + '/card/' + self.id,
      method: 'DELETE',
      success: function(){
        self.element.remove();
      }
    });
	},


//edycja nazwy karty
	editCard: function() {
		var self = this;
		var cardDescription = $('<p class="card-description"></p>');
		var newName = prompt('Edit card name: ');
		$.ajax({
					url: baseUrl + '/card/' + self.id,
					method: 'PUT',
					data: {
							name: newName,
							bootcamp_kanban_column_id: self.idColumn
					},
					success: function() {
						if(newName !== null && newName.length !== 0){
							cardDescription.replaceWith(newName);
							console.log(newName);
			     		self.element.find('.card-description').text(newName);
						}
					}
			});
	}


};
