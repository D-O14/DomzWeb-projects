import "./cravory.css";
import { config } from "./modules/config";
import { Button } from "@components/button/button.js";
import { Input } from "@components/form/input/input.js";
import { initializeIcons } from "@assets/Icons/icons.js";
import { $, query, parseHTML, initializeActions } from "@utils/DOM.js";

const actions = {};
const pages = {};

function Input(config) { return parseHTML(``) };
function NavBar(config) { return parseHTML(``) };
function Slider(config) { return parseHTML(``) };
function ProductCard(config) { return parseHTML(``) };
function TestimonialCard(config) { return parseHTML(``) };
function TestimonialSlider(config) { return parseHTML(``) };

function router() { };

function renderApp() { 
    query(".app-header").append(NavBar(config));
    initializeIcons();
    initializeActions();
};