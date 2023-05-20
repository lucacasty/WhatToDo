var _notes = {

	_listNotes: "#listNotes",
	_newNoteName: "#add-note-name",
	_newNoteDescr: "#add-note-descr",
	_colorPicker: "#colorpicker",
	_btnSaveNote: "#btnSaveNote",
	_aNotes: null,

	/*Init Main View*/
	init: function() {
		var _this = this;
		_this._aNotes = localStorage.getItem('notes');
		if(_this._aNotes === undefined || _this._aNotes === null || _this._aNotes.length === 0 || _this._aNotes === "[]" ) {
			$(_this._listNotes).html(_system.label("no-notes"));
			_this._aNotes = [];
			return;
		}
		_this._aNotes = JSON.parse(_this._aNotes);
		$(_this._listNotes).html('');
		_this._aNotes.sort((a,b) => (a.timestamp < b.timestamp) ? 1 : ((b.timestamp < a.timestamp) ? -1 : 0));
		for (var key in _this._aNotes) {
			var item = _this._aNotes[key];
			_views.notes.article("note", item).then(function(data) {
				$(_this._listNotes).append(data);
			});
		}
	},

	addNote: function(){
		var _this = this;
		_modal.show('add-note').then(function() {
			var randomColor = Math.floor(Math.random()*16777215).toString(16).toUpperCase();
			$(_this._colorPicker).val("#" + randomColor);
		});
	},

	saveNote: function(noteId){
		var _this = this;

		//check for valid fields
		var sName = $(_this._newNoteName).val();
		var sDescr = $(_this._newNoteDescr).val();
		var sColor = $(_this._colorPicker).val();

		if(sName === "") {
			_toastmessage.error(400);
			return;
		}

		var itemId = 0;
		if(noteId !== null && noteId !== undefined) {
			itemId = noteId;
		}
		else{
			if(_this._aNotes !== undefined && _this._aNotes !== null && _this._aNotes.length != 0) {
				_this._aNotes.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
				itemId = parseInt(_this._aNotes[(_this._aNotes.length-1)]['id'] + 1);
			}
		}

		var date = new Date();
		let currentDay= String(date.getDate()).padStart(2, '0');
		let currentMonth = String(date.getMonth()+1).padStart(2,"0");
		let currentYear = date.getFullYear();
		let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

		let timestamp = date.getTime();

		var oItem = {
			id: itemId,
			name: sName,
			descr: sDescr,
			date: currentDate,
			color: sColor,
			timestamp: timestamp,
			key: sName + '-' + timestamp
		};

		//checking if it is a substitution or a new one
		if(noteId !== null && noteId !== undefined) {
			var objWithIdIndex = _this._aNotes.findIndex((obj) => obj.id === parseInt(noteId));

			if (objWithIdIndex > -1) {
				_this._aNotes.splice(objWithIdIndex, 1);
			}
		}

		_this._aNotes.push(oItem);
		localStorage.setItem('notes',JSON.stringify(_this._aNotes));
		_modal.hide();
		_this.init();
	},

	deleteNote: function(noteId) {
		var _this = this;
		if(confirm(_system.label('delete-note-confirm'))) {

			var objWithIdIndex = _this._aNotes.findIndex((obj) => obj.id === parseInt(noteId));

			if (objWithIdIndex > -1) {
				_this._aNotes.splice(objWithIdIndex, 1);
			}

			localStorage.setItem('notes',JSON.stringify(_this._aNotes));
			_notes.init();
		}
	},

	editNote: function(noteId){
		var _this = this;
		_modal.show('add-note').then(function() {
			var objWithIdIndex = _this._aNotes.findIndex((obj) => obj.id === parseInt(noteId));
			var item = _this._aNotes[objWithIdIndex];
			$(_this._newNoteName).val(item['name']);
			$(_this._newNoteDescr).val(item['descr']);
			$(_this._colorPicker).val(item['color']);
			$(_this._btnSaveNote).attr('action','_notes.saveNote(' + item['id'] + ')');
		});
	},

}