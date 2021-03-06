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
class SongGP1 extends SongGP {
	constructor() {
		super();
	}
}
class SongGP2 extends SongGP1 {
	constructor() {
		super();
	}
}
class SongGP3 extends SongGP2 {
	constructor() {
		super();
		this.artist = new String();
		this.copywright = new String();
		this.writter = new String();
		this.album = new String();
		this.subArtist = new String();
		this.comments = new String();
	}
}
class SongGP4 extends SongGP3 {

	constructor() {
		super();

	}

}
class SongGP5 extends SongGP4 {
	constructor() {
		super();

	}

}
class SongGP6 extends SongGP5 {}
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

		this.song =null;//= new SongGP5();
		this.ReadFile();

	}

	/*VERSION METHODS*/
	ommitBytes(bytes) {
		this.beginCarret += bytes;
	}
	readStringAndReturnLength()
	{
		//read size of string
		var size = this.fileContent.charCodeAt(this.beginCarret);
		var sstring={s:"",length:0};
		if(size>1){
		//console.log("size " + size)
		this.beginCarret++;
		//read string
		 sstring.s= this.fileContent.slice(this.beginCarret, this.beginCarret + size);
		this.beginCarret += (size+4);
		//console.log("Carret At " + this.beginCarret + ":" + size);
		}
		else
		{
			this.beginCarret += 5;
			sstring.s="NON"
		}
		sstring.length=size;
		return sstring;
	}
	
		

	readString() {

		
		
		//read size of string
		var size = this.fileContent.charCodeAt(this.beginCarret);
		
		var string;
		if(size>1){
				 		console.log(string + " " + size 
		+ " "+this.beginCarret + " wieksze");
		this.beginCarret++;
		//read string
		 string= this.fileContent.slice(this.beginCarret, this.beginCarret + size);

		this.beginCarret += (size+4);
		//console.log("Carret At " + this.beginCarret + ":" + size);
		}
		else // null string in GP4 01 00 00 00 00
		{
					console.log(string + " " + size 
		+ " "+this.beginCarret);
			this.beginCarret += 5;
			string="NON"
		}

		console.log(this.beginCarret 
+ "PO "+ string );
		return string;

	}
	readInt() {

var tab=[];
for(var g=0;g<4;g++)
{
tab.push(this.fileContent.charCodeAt(this.beginCarret+g).toString(16));

}
console.log("TAB "+tab);

		var g= ((tab[3]) << 24) | ((tab[2] ) << 16) | ((tab[1] ) << 8) | (tab[0] );
this.beginCarret+=4;		
		return g;
	}

	readByte() {
		return this.fileContent.charCodeAt(this.beginCarret);
	}
	CheckComptibility() {
	var return_=this.readStringAndReturnLength();
		this.version = return_.s;
		console.log(return_.length);
		this.ommitBytes(30-return_.length)
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

			this.reader = new FileReader();
			var that = this;

			this.reader.onloadend = function (evt) {
				that.fileContent = evt.target.result;
				console.log("File LOADED");
				that.CheckComptibility();

			};

			this.reader.readAsText(this.file);

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

		this.song = new SongGP5();

		console.log("GuitarPro5");

		this.song.name = this.readString(); //title
		//this.ommitBytes(4);

		this.song.subArtist = this.readString(); //subtitle
		//this.ommitBytes(4);

		this.song.artist = this.readString(); //artist
		//this.ommitBytes(4);

		this.song.album = this.readString(); //album
		//this.ommitBytes(4);

		this.song.author = this.readString(); //lyricist // EMPTY
		//this.ommitBytes(4);

		this.readString(); // composer
		//this.ommitBytes(4);

		this.song.copywright = this.readString(); //copywrigth
		//this.ommitBytes(4);

console.log("writter");
		this.song.writter = this.readString(); //transcriber
		//this.ommitBytes(4);

		console.log("instructions");
		this.readString(); // instructions
		//console.log("Read instructions");


	//comments
//console.log(this.readInt());	//tutaj jest cos dziwnego bo zawswze 8 bajtow wskazuje na ilosc liter w komentarzu, a nie ilosc lini komentarza jak jest w orginale
	this.readInt();
	this.song.comments=this.readString();

		//var count = this.readInt();//comments
		//console.log("Comments count "+count);
		
		/*for (var i = 0; i < count; i++) {
			this.comments+=this.readString();
			//this.ommitBytes(4);

		}
		
		console.log("Triplets" + this.readByte());
		var lyricsTrack = this.readInt();

		var lyricsTrack = this.readInt();
		var lyrics = this.readString();
		this.ommitBytes(4);

		for (var i = 0; i < 4; i++) {
			this.readInt();
			this.readString();
			this.ommitBytes(4);

		}
		this.ommitBytes(4);

		console.log(this.readInt() + "Temp");
		//console.log("Triplets "+this.readByte()); //triplets
		//console.log("tempo "+this.readInt()); //tempo
*/
		console.log(this.song);
	}
	GP4Loader() {
		this.GP5Loader();

	}
}
