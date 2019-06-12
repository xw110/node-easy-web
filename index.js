var http = require('http');
var fs = require("fs");
var url = require("url");
var Path = require("path")
var process = require('process');

/**
 * 全局对象
 */
var appJson = {};

/**
 * http contentTypes
 */
var contentTypes = {
	".*": "application/octet-stream",
	".tif": "application/x-tif",
	".asp": "text/asp",
	".asx": "video/x-ms-asf",
	".au": "audio/basic",
	".avi": "video/avi",
	".awf": "application/vnd.adobe.workflow",
	".biz": "text/xml",
	".bmp": "application/x-bmp",
	".bot": "application/x-bot",
	".cit": "application/x-cit",
	".class": "java/*",
	".csi": "application/x-csi",
	".css": "text/css",
	".dcd": "text/xml",
	".dcx": "application/x-dcx",
	".dib": "application/x-dib",
	".dll": "application/x-msdownload",
	".doc": "application/msword",
	".dot": "application/msword",
	".drw": "application/x-drw",
	".dtd": "text/xml",
	".dwf": "application/x-dwf",
	".etd": "application/x-ebx",
	".exe": "application/x-msdownload",
	".gif": "image/gif",
	".gl2": "application/x-gl2",
	".hrf": "application/x-hrf",
	".hta": "application/hta",
	".htc": "text/x-component",
	".htm": "text/html",
	".html": "text/html",
	".htt": "text/webviewhtml",
	".htx": "text/html",
	".icb": "application/x-icb",
	".ico": "application/x-ico",
	".iff": "application/x-iff",
	".ig4": "application/x-g4",
	".igs": "application/x-igs",
	".iii": "application/x-iphone",
	".img": "application/x-img",
	".ins": "application/x-internet-signup",
	".java": "java/*",
	".jfif": "image/jpeg",
	".jpe": "application/x-jpe",
	".jpeg": "image/jpeg",
	".jpg": "application/x-jpg",
    ".js": "application/x-javascript",
    ".json": "application/json",
	".jsp": "text/html",
	".la1": "audio/x-liquid-file",
	".mdb": "application/x-mdb",
	".mfp": "application/x-shockwave-flash",
	".mht": "message/rfc822",
	".mhtml": "message/rfc822",
	".mi": "application/x-mi",
	".mid": "audio/mid",
	".midi": "audio/mid",
	".mil": "application/x-mil",
	".mml": "text/xml",
	".mnd": "audio/x-musicnet-download",
	".mns": "audio/x-musicnet-stream",
	".mocha": "application/x-javascript",
	".movie": "video/x-sgi-movie",
	".mp1": "audio/mp1",
	".mp2": "audio/mp2",
	".mp2v": "video/mpeg",
	".mp3": "audio/mp3",
	".mp4": "video/mpeg4",
	".mpa": "video/x-mpg",
	".mpd": "application/vnd.ms-project",
	".mpe": "video/x-mpeg",
	".mpeg": "video/mpg",
	".mpg": "video/mpg",
	".mpga": "audio/rn-mpeg",
	".mpp": "application/vnd.ms-project",
	".mps": "video/x-mpeg",
	".mpt": "application/vnd.ms-project",
	".mpv": "video/mpg",
	".mpv2": "video/mpeg",
	".mpw": "application/vnd.ms-project",
	".mpx": "application/vnd.ms-project",
	".mtx": "text/xml",
	".mxp": "application/x-mmxp",
	".net": "image/pnetvue",
	".nrf": "application/x-nrf",
	".nws": "message/rfc822",
	".odc": "text/x-ms-odc",
	".out": "application/x-out",
	".p10": "application/pkcs10",
	".p12": "application/x-pkcs12",
	".p7b": "application/x-pkcs7-certificates",
	".p7c": "application/pkcs7-mime",
	".p7m": "application/pkcs7-mime",
	".p7r": "application/x-pkcs7-certreqresp",
	".p7s": "application/pkcs7-signature",
	".pc5": "application/x-pc5",
	".pci": "application/x-pci",
	".pcl": "application/x-pcl",
	".pcx": "application/x-pcx",
	".pdf": "application/pdf",
	".pdx": "application/vnd.adobe.pdx",
	".pfx": "application/x-pkcs12",
	".pgl": "application/x-pgl",
	".pic": "application/x-pic",
	".pko": "application/vnd.ms-pki.pko",
	".pl": "application/x-perl",
	".plg": "text/html",
	".pls": "audio/scpls",
	".plt": "application/x-plt",
	".png": "application/x-png",
	".pot": "application/vnd.ms-powerpoint",
	".ppa": "application/vnd.ms-powerpoint",
	".ppm": "application/x-ppm",
	".pps": "application/vnd.ms-powerpoint",
	".ppt": "application/x-ppt",
	".pr": "application/x-pr",
	".prf": "application/pics-rules",
	".prn": "application/x-prn",
	".prt": "application/x-prt",
	".ps": "application/postscript",
	".ptn": "application/x-ptn",
	".pwz": "application/vnd.ms-powerpoint",
	".r3t": "text/vnd.rn-realtext3d",
	".ra": "audio/vnd.rn-realaudio",
	".ram": "audio/x-pn-realaudio",
	".ras": "application/x-ras",
	".rat": "application/rat-file",
	".rdf": "text/xml",
	".rec": "application/vnd.rn-recording",
	".red": "application/x-red",
	".rgb": "application/x-rgb",
	".rjs": "application/vnd.rn-realsystem-rjs",
	".rjt": "application/vnd.rn-realsystem-rjt",
	".rlc": "application/x-rlc",
	".rle": "application/x-rle",
	".rm": "application/vnd.rn-realmedia",
	".rmf": "application/vnd.adobe.rmf",
	".rmi": "audio/mid",
	".rmj": "application/vnd.rn-realsystem-rmj",
	".rmm": "audio/x-pn-realaudio",
	".rmp": "application/vnd.rn-rn_music_package",
	".rms": "application/vnd.rn-realmedia-secure",
	".rmvb": "application/vnd.rn-realmedia-vbr",
	".rmx": "application/vnd.rn-realsystem-rmx",
	".rnx": "application/vnd.rn-realplayer",
	".rp": "image/vnd.rn-realpix",
	".rpm": "audio/x-pn-realaudio-plugin",
	".rsml": "application/vnd.rn-rsml",
	".rt": "text/vnd.rn-realtext",
	".rtf": "application/x-rtf",
	".rv": "video/vnd.rn-realvideo",
	".sam": "application/x-sam",
	".sat": "application/x-sat",
	".sdp": "application/sdp",
	".sdw": "application/x-sdw",
	".sit": "application/x-stuffit",
	".slb": "application/x-slb",
	".sld": "application/x-sld",
	".slk": "drawing/x-slk",
	".smi": "application/smil",
	".smil": "application/smil",
	".smk": "application/x-smk",
	".snd": "audio/basic",
	".sol": "text/plain",
	".sor": "text/plain",
	".spc": "application/x-pkcs7-certificates",
	".spl": "application/futuresplash",
	".spp": "text/xml",
	".ssm": "application/streamingmedia",
	".sst": "application/vnd.ms-pki.certstore",
	".stl": "application/vnd.ms-pki.stl",
	".stm": "text/html",
	".sty": "application/x-sty",
	".svg": "text/xml",
	".swf": "application/x-shockwave-flash",
	".tdf": "application/x-tdf",
	".tg4": "application/x-tg4",
	".tga": "application/x-tga",
	".tiff": "image/tiff",
	".tld": "text/xml",
	".top": "drawing/x-top",
	".torrent": "application/x-bittorrent",
	".tsd": "text/xml",
	".txt": "text/plain",
	".uin": "application/x-icq",
	".uls": "text/iuls",
	".vcf": "text/x-vcard",
	".vda": "application/x-vda",
	".vdx": "application/vnd.visio",
	".vml": "text/xml",
	".vpg": "application/x-vpeg005",
	".vsd": "application/x-vsd",
	".vss": "application/vnd.visio",
	".vst": "application/x-vst",
	".vsw": "application/vnd.visio",
	".vsx": "application/vnd.visio",
	".vtx": "application/vnd.visio",
	".vxml": "text/xml",
	".wav": "audio/wav",
	".wax": "audio/x-ms-wax",
	".wb1": "application/x-wb1",
	".wb2": "application/x-wb2",
	".wb3": "application/x-wb3",
	".wbmp": "image/vnd.wap.wbmp",
	".wiz": "application/msword",
	".wk3": "application/x-wk3",
	".wk4": "application/x-wk4",
	".wkq": "application/x-wkq",
	".wks": "application/x-wks",
	".wm": "video/x-ms-wm",
	".wma": "audio/x-ms-wma",
	".wmd": "application/x-ms-wmd",
	".wmf": "application/x-wmf",
	".wml": "text/vnd.wap.wml",
	".wmv": "video/x-ms-wmv",
	".wmx": "video/x-ms-wmx",
	".wmz": "application/x-ms-wmz",
	".wp6": "application/x-wp6",
	".wpd": "application/x-wpd",
	".wpg": "application/x-wpg",
	".wpl": "application/vnd.ms-wpl",
	".wq1": "application/x-wq1",
	".wr1": "application/x-wr1",
	".wri": "application/x-wri",
	".wrk": "application/x-wrk",
	".ws": "application/x-ws",
	".ws2": "application/x-ws",
	".wsc": "text/scriptlet",
	".wsdl": "text/xml",
	".wvx": "video/x-ms-wvx",
	".xdp": "application/vnd.adobe.xdp",
	".xdr": "text/xml",
	".xfd": "application/vnd.adobe.xfd",
	".xfdf": "application/vnd.adobe.xfdf",
	".xhtml": "text/html",
	".xls": "application/x-xls",
	".xlw": "application/x-xlw",
	".xml": "text/xml",
	".xpl": "audio/scpls",
	".xq": "text/xml",
	".xql": "text/xml",
	".xquery": "text/xml",
	".xsd": "text/xml",
	".xsl": "text/xml",
	".xslt": "text/xml",
	".xwd": "application/x-xwd",
	".x_b": "application/x-x_b",
	".sis": "application/vnd.symbian.install",
	".sisx": "application/vnd.symbian.install",
	".x_t": "application/x-x_t",
	".ipa": "application/vnd.iphone",
	".apk": "application/vnd.android.package-archive",
	".xap": "application/x-silverlight-app"
};

/**
 * 请求类型
 */
var methodTypes = {
    GET: "GET",
    POST : "POST",
    HEAD: "HEAD",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE",
    TRACE: "TRACE",
    CONNECT: "CONNECT",
    OPTIONS: "OPTIONS",
    MOVE: "MOVE",
    COPY: "COPY",
    LINK: "LINK"
};

function start() {
    let port = appJson['port'];
    if (!port) {
        port = 8080;
    }

    let staticPath = appJson['static_path'];
    if(!staticPath){
        staticPath = process.cwd();
    } else {
		staticPath = buildRealPath(staticPath);
	}
    
    let server = http.createServer(function (request, response) {    
		//console.log(request.url, request.method);
		response.renderBodyString = wrapRes(response, renderBodyString);
		response.renderBodyJSON = wrapRes(response, renderBodyJSON);
		response.renderBodyHtml = wrapRes(response, renderBodyHtml);
        initRoutes(request, response, staticPath);
	});
	server.listen(port);

	appJson['appServer'] = server;
       
    // start service log...    
	console.log('Server running at http://localhost:' + port);
}

function wrapRes(obj, f) {
	let nf = function(arg) {
		f(obj, arg);
	};
	return nf;
}

/**
 * 关闭服务器
 */
function stop() {
	if (appJson['appServer']) {
		appJson['appServer'].close();
	}
}


function buildRealPath(basepath) {
    //绝对路径
    if (basepath.startsWith('/') || basepath.charAt(1) == ':') {
        return basepath
    }
    //相对路径
    return Path.resolve(basepath)
}


function initRoutes(request, response, static_path){
	let autoLoad = appJson['auto_load'];
	
	if (autoLoad) {
		//热加载开启
		let mpath = appJson['route_module_path'];
		//删除模块缓存
		delete require.cache[mpath];
		registerRoutesByModule(mpath);
	}
    var services = appJson['routes'];
    if (!services) {
	services  = {};
    }
    var urlstr = url.parse(request.url).pathname;
    var method = request.method;
    var service = services[urlstr + "#" + method];
    if (!service) {
        service = services[urlstr];
    }
    if(service){
		try {
			service(request, response);
		} catch (e) {
			//服务异常
			resServiceError(response, e);
		}
    } else {
        var suffix = urlstr.substr(urlstr.lastIndexOf("."));
        var ct = contentTypes[suffix];
        if (ct){
            response.writeHead(200, {'Content-Type': ct + ';charset=utf-8'}); 
        } else {
            response.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
        }

        //console.log("url:" + urlstr);
        //console.log("static path:" + static_path);
        
        // 同步读取
        var data = readFile(Path.join(static_path, urlstr));
        if (data) {
            response.write(data);
            response.end();
        } else {
            let page404_path = appJson['page_not_found'];
            if (page404_path) {
                let data = readFile(Path.join(static_path, page404_path));
                if (data) {
                    response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
                    response.write(data);
                    response.end();
                    return;
                }
            }
            response.writeHead(404, {}); 
            response.write("page not found!404");
            response.end();
        }
    }
}

function resServiceError(res, e) {
	try {
		let ef = appJson['serverErrorFun'];
		if (ef) {
			ef(res, e);
		} else {
			renderBodyHtml(res, "<h6>system error!500</h6>", 500);
		}
	} catch (error) {
		renderBodyHtml(res, "<h6>system error!500</h6>", 500);
	}
}

function readFile(filePath) {
    try {
        let data = fs.readFileSync(filePath);
        return data;
    } catch (e) {
        //console.log("readFile error");
        //throw e;
        return null;
    } finally {
    }
}

function registerRoutes(routes) {
    if (!routes) {
        throw new Error("routes必须设置!");
    }
    appJson['routes'] = routes
}

function registerRoutesByModule(routes) {
	let route_g = routes;
	let t = Object.prototype.toString.call(routes);
	if (t == "[object Object]") {
		//模块
		let filePath = routes.filePath;
		if (filePath && routes.routes) {
			appJson["route_module_path"] = routes.filePath;
			routes = routes.routes;			
		} else {
			throw new Error("模块中必须有filePath,routes变量!");
		}
	} else if (t == "[object String]") {
		var rmodel = require(routes);
		if (rmodel) {
			appJson["route_module_path"] = routes;
			routes = rmodel.routes;
		} else {
			throw new Error("模块文件不存在!");
		}
	} else {
		throw new Error("必须设置模块或模块路径!");
	}

	appJson['routes'] = routes;
}

function get(k, f) {
	let kt = Object.prototype.toString.call(k);
	if (!k || kt != "[object String]") {
		throw new Error('必须输入有效的请求路径!');
	}

	let ft = Object.prototype.toString.call(f);
	if (!f || ft != "[object Function]") {
		throw new Error('必须为function!');
	}

	if (!appJson['routes']) {
		appJson['routes'] = {}
	}
	appJson['routes'][k + "#" + methodTypes.GET] = f;
}

function post(k, f) {
	let kt = Object.prototype.toString.call(k);
	if (!k || kt != "[object String]") {
		throw new Error('必须输入有效的请求路径!');
	}

	let ft = Object.prototype.toString.call(f);
	if (!f || ft != "[object Function]") {
		throw new Error('必须为function!');
	}

	if (!appJson['routes']) {
		appJson['routes'] = {}
	}
	appJson['routes'][k + "#" + methodTypes.POST] = f;
}

function put(k, f) {
	let kt = Object.prototype.toString.call(k);
	if (!k || kt != "[object String]") {
		throw new Error('必须输入有效的请求路径!');
	}

	let ft = Object.prototype.toString.call(f);
	if (!f || ft != "[object Function]") {
		throw new Error('必须为function!');
	}

	appJson['routes'][k + "#" + methodTypes.PUT] = f;
}

function all(k, f) {
	let kt = Object.prototype.toString.call(k);
	if (!k || kt != "[object String]") {
		throw new Error('必须输入有效的请求路径!');
	}

	let ft = Object.prototype.toString.call(f);
	if (!f || ft != "[object Function]") {
		throw new Error('必须为function!');
	}

	appJson['routes'][k] = f;
}

function init(config) {
    let t = Object.prototype.toString.call(config);
    if (t == "[object Object]" || t == "[object Undefined]") {
		if (!config) {
			config = {}
		}
		appJson = config;
    } else {
        console.log("config必须是一个JSON对象");
        throw new Error('config必须是一个JSON对象');
    }
}

function initConfigFile(realPath) {
	if (!realPath) {
		realPath = Path.join(process.cwd(), "/app.json");
	}
	let data = readFile(realPath);
	if (!data) {
		throw new Error('配置文件app.json不存在!' + realPath);
	}
    appJson = JSON.parse(data);
}

function setPort(port) {
    let t = Object.prototype.toString.call(port);
    if (t == "[object Number]") {
        appJson['port'] = port;
    } else {
        throw new Error('端口必须为数字类型!')
    }
}

/**
 * 注册服务异常响应
 * @param {} callFun 
 */
function registerSystemError(callFun) {
	if (!callFun) {
		return;
	}
	appJson['serverErrorFun'] = callFun;
}

function renderBodyJSON(res, data){
    res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
    res.write(JSON.stringify(data));
    res.end();
}

function renderBodyString(res, data){
    res.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
    res.write(data);
    res.end();
}

function renderBodyHtml(res, data, status = 200){
    res.writeHead(status, {'Content-Type': 'text/html;charset=utf-8'});
    res.write(data);
    res.end();
}

exports.init = init
exports.initConfigFile = initConfigFile
exports.registerRoutes = registerRoutes
exports.registerRoutesByModule = registerRoutesByModule
exports.registerSystemError = registerSystemError
exports.start = start
exports.stop = stop
exports.renderBodyJSON = renderBodyJSON
exports.renderBodyString = renderBodyString
exports.renderBodyHtml = renderBodyHtml
exports.get = get
exports.post = post
exports.put = put
exports.all = all
