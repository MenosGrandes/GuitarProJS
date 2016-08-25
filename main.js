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
class SongGP {
	constructor() {
		this.name = new String();
		this.author = new String();
	}
}
class SongGP1 extends SongGP{
	constructor() {
		super();
	}
}
class SongGP2 extends SongGP1{
	constructor() {
		super();
	}
}
class SongGP3 extends SongGP2{
	constructor() {
		super();
		this.artist = new String();
		this.copywright = new String();
		this.writter = new String();
		this.album = new String();
		this.subArtist=new String();
	}
}
class SongGP4 extends SongGP3{

	constructor() {
		super();

	}

}
class SongGP5 extends SongGP4{
	constructor() {
		super();

	}

}
class SongGP6 extends SongGP5{}
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
		this.beginCarret = 0;
		this.endCarret = 0;

		this.song = new SongGP();
		this.ReadFile();

	}

	/*VERSION METHODS*/
	ommitBytes(bytes) {
		this.beginCarret += bytes;
	}
	readString() {
		//read size of string
		var size = this.fileContent.charCodeAt(this.beginCarret);
		//console.log("size " + size)
		this.beginCarret++;
		//read string
		var string = this.fileContent.slice(this.beginCarret, this.beginCarret + size);
		this.beginCarret += size;
		//console.log("Carret At " + this.beginCarret + ":" + size);

		return string;

	}
	readInt()
	{
			var _int =this.fileContent.slice(this.beginCarret, this.beginCarret +3);
				console.log(this.fileContent.charCodeAt(this.beginCarret));
								console.log(this.fileContent.charCodeAt(this.beginCarret+1));
				console.log(this.fileContent.charCodeAt(this.beginCarret+2));
				console.log(this.fileContent.charCodeAt(this.beginCarret+3));

				    return ((_int[3] & 0xff) << 24) | ((_int[2] & 0xff) << 16)
        | ((_int[1] & 0xff) << 8) | (_int[0] & 0xff);

	}
	readByte()
	{
		return this.fileContent.charCodeAt(this.beginCarret);
	}
	CheckComptibility() {

		this.version = this.readString();
		var version = this.isCompatibileWith();
		switch (version) {
		case 4:
			this.GP4Loader();
			break;
		case 5:
			this.GP5Loader();
			break;
		default:
			console.log("UNDEFINED VERSION");
		}
		console.log(this.version);

	}

	ReadFile() {
		if (this.file) {

			var reader = new FileReader();
			var that = this;

			reader.onloadend = function (evt) {
				that.fileContent = evt.target.result;
				console.log("File LOADED");
				that.CheckComptibility();

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
	GP5Loader() {
		
		//console.log(this.fileContent);
		
		this.song=new SongGP5();
		this.ommitBytes(10);
		console.log("GuitarPro5");

		this.song.name = this.readString();
		this.ommitBytes(4);
		this.song.subArtist = this.readString();
		this.ommitBytes(4);
		this.song.artist = this.readString();
		this.ommitBytes(4);
		this.song.album = this.readString();
		this.ommitBytes(4);
		this.song.author = this.readString();
		this.ommitBytes(4);
		this.song.copywright = this.readString();
		this.ommitBytes(4);
		this.song.writter = this.readString();
		
		console.log(this.readInt()); //notice
				console.log("Triplets "+this.readByte()); //triplets
				console.log("tempo "+this.readInt()); //tempo

		console.log(this.song);
	}
	GP4Loader() {
		this.GP5Loader();

	}
}
