var _notes = {

	_listNotes: "#listNotes",
	_newNoteName: "#add-note-name",
	_newNoteDescr: "#add-note-descr",

	/*Init Main View*/
	init: function() {
		var _this = this;
		var aNotes = localStorage.getItem('notes');
		if(aNotes === undefined || aNotes === null || aNotes.length == 0) {
			$(_this._listNotes).html(_system.label("no-notes"));
			return;
		}
		aNotes = JSON.parse(aNotes);
		$(_this._listNotes).html('');
		aNotes.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
		for (var key in aNotes) {
			var item = aNotes[key];
			item['action'] = "_notes.openCloseMessage()";
			_views.notes.article("note", item).then(function(data) {
				$(_this._listNotes).append(data);
			});
		}
	},

	addNote: function(){
		_modal.show('add-note');
	},

	saveNote: function(){
		var _this = this;

		//check for valid fields
		var sName = $(_this._newNoteName).val();
		var sDescr = $(_this._newNoteName).val();

		if(sName === "") {
			_toastmessage.error(400);
			return;
		}

		var aNotes = (localStorage.getItem('notes'));
		var itemId = 0;
		if(aNotes !== undefined && aNotes !== null && aNotes.length != 0) {
			aNotes = JSON.parse(aNotes);
			aNotes.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
			itemId = parseInt(aNotes[(aNotes.length-1)]['id']);
		}
		else {
			aNotes = [];
		}

		var date = new Date();
		let currentDay= String(date.getDate()).padStart(2, '0');
		let currentMonth = String(date.getMonth()+1).padStart(2,"0");
		let currentYear = date.getFullYear();
		let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

		var oItem = {
			id: itemId,
			name: sName,
			descr: sDescr,
			date: currentDate,
			key: sName + '-' + new Date()
		};
		aNotes.push(oItem);
		localStorage.setItem('notes',JSON.stringify(aNotes));
		_modal.hide();
		_this.init();
	}

}