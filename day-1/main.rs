use std::collections::HashMap;
use std::fs;

fn str_slice_back(value: &str, chars: usize) -> Option<&str> {
    if value.len() < chars {
        return None;
    }

    return Some(&value[value.len() - chars..value.len()]);
}

fn get_calibration_value(
    line: &str,
    valid_digit_words: &HashMap<&str, i32>,
    accumulator: Option<&str>,
    done: Option<bool>,
) -> i32 {
    if line.len() == 0 {
        return 0;
    }

    let acc = accumulator.unwrap_or("");
    let d = done.unwrap_or(false);

    let ps = [
        str_slice_back(acc, 3),
        str_slice_back(acc, 4),
        str_slice_back(acc, 5),
    ];

    let matching_word = ps
        .iter()
        .find(|v| v.map_or(false, |f| valid_digit_words.contains_key(f)))
        .and_then(|v| v.clone())
        .map(|v| valid_digit_words.get(v))
        .and_then(|v| v.clone());

    if matching_word.is_some() {
        let new_str = format!("{}{}", matching_word.unwrap().to_string(), line);

        return get_calibration_value(&new_str, valid_digit_words, Some(""), Some(d));
    }

    let code = line.chars().next().unwrap();
    let number = code.to_digit(10);

    match (number, d) {
        (None, _) => {
            let new_accumulator = format!("{}{}", acc, &line[0..1]);
            get_calibration_value(&line[1..], valid_digit_words, Some(&new_accumulator), Some(d))
        }
        (Some(num), true) => num as i32,
        (Some(num), false) => {
            let reversed = line.chars().rev().collect::<String>();
            (num as i32 * 10) + get_calibration_value(&reversed, valid_digit_words, Some(""), Some(true))
        }
    }
}

fn main() {
    let file_content = fs::read_to_string("input").expect("Should have been able to load input.");
    let contents = file_content.split('\n');
    let valid_digit_words: HashMap<&str, i32> = HashMap::from([
        ("one", 1),
        ("two", 2),
        ("three", 3),
        ("four", 4),
        ("five", 5),
        ("six", 6),
        ("seven", 7),
        ("eight", 8),
        ("nine", 9),
        ("eno", 1),
        ("owt", 2),
        ("eerht", 3),
        ("ruof", 4),
        ("evif", 5),
        ("xis", 6),
        ("neves", 7),
        ("thgie", 8),
        ("enin", 9),
    ]);

    let mut r = 0;
    for line in contents {

        let cv = get_calibration_value(line, &valid_digit_words, None, None);

        r = r + cv;
    }

    println!("{r}");
}
