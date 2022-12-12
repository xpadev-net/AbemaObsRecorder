import babel from '@rollup/plugin-babel';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import image from '@rollup/plugin-image';
import postcss from 'rollup-plugin-postcss';
import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" assert {type: 'json'};

const banner = `// ==UserScript==
// @name           AbemaObsRecorder
// @namespace      https://github.com/xpadev-net/
// @description    OBSと連携してAbemaの動画を録画するためのツール
// @match          *://abema.tv/*
// @grant          GM_xmlhttpRequest
// @grant          GM.xmlHttpRequest
// @author         xpadev-net
// @version        ${pkg.version}
// @run-at         document-body
// ==/UserScript==
/*!
  AbemaObsRecorder v${pkg.version}
  (c) 2022 xpadev-net https://xpadev.net
  Released under the ${pkg.license} License.
*/`;

export default {
	input: 'src/loader.ts',
	output: {
		file: `dist/AbemaObsRecorder.user.js`,
		format: 'umd',
		name: 'AbemaObsRecorder',
		banner
	},
	plugins: [
		typescript(),
		image(),
		postcss({
			extensions: [".css"],
			modules: true,
		}),
		nodeResolve({
			extensions: [".js"],
		}),
		replace({
			preventAssignment: true,
			'process.env.NODE_ENV': JSON.stringify('production'),
			'RELEASE_VER': `ver ${pkg.version}`,
		}),
		babel({
			presets: ["@babel/preset-react"],
		}),
		commonjs(),
	]
}