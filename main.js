class GPSettings {
	constructor() {
		this.DEFAULT_CHARSET = "UTF-8";
	}

	getCharset() {
		return this.DEFAULT_CHARSET;
	}
	setCharset(charset) {
		this.DEFAULT_CHARSET = charset;
	}
}
class Song {
	constructor() {
		this.album = new String();
		this.artist = new String();
		this.author = new String();
		this.comments = new String();
		this.copyright = new String();
		this.date = new String();
		//private List<TGMeasureHeader> measureHeaders = new ArrayList<TGMeasureHeader>();
		this.name = new String();
		//private List<TGTrack> tracks = new ArrayList<TGTrack>();
		this.transcriber = new String();
		this.writer = new String();
	}
}
/*To powinno być bardziej jak fabryka.
Sprawdza wersje i do tej wersji wypluwa odpowiednia klase*/
class GPLoader {

	constructor(_settings, _file) {
		/*Const*/
		this.versions = [{
				VERSION : 5,
				NAMES : ["FICHIER GUITAR PRO v5.00", "FICHIER GUITAR PRO v5.10", "FICHIER GUITAR PRO v5.1"]
			}, {
				VERSION : 4,
				NAMES : ["FICHIER GUITAR PRO v4.00", "FICHIER GUITAR PRO v4.06", "FICHIER GUITAR PRO L4.06", "FICHIER GUITAR PRO v4.0"]
			}
		]

		this.settings = _settings;

		this.file = _file;
		this.fileContent = null;
		this.version = new String("");
		this.ReadFile();

	}

	/*VERSION METHODS*/
	readVersion() {

		if (this.version == "") {
			this.version = this.fileContent.slice(1, this.fileContent.charCodeAt(0));
			console.log(this.version);
		}

	}

	ReadFile() {
		if (this.file) {

			var reader = new FileReader();
			var that = this;
			reader.onloadend = function (evt) {
				that.fileContent = evt.target.result;
				console.log("File LOADED");
				that.readVersion()
				var version = that.isCompatibileWith();
				switch (version) {
				case 4:
					break;
				case 5:
					break;
				default:
					console.log("UNDEFINED");
				}
				console.log(version);

			};

			reader.readAsBinaryString(this.file);

		}
	}
	isCompatibileWith() {
		for (var i = 0; i < this.versions.length; i++) {
			for (var j = 0; j < this.versions[i].NAMES.length; j++) {
				if (this.versions[i].NAMES[j] == this.version) {
					return this.versions[i].VERSION;
				}
			}

		}
		return -1;
	}

}

class GP5Loader extends GPLoader {

	constructor(_settings, _file) {

		super(_settings, _file);
	}
}
