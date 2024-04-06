package in.sanjeetdutt.M002_Design_Pattern.P002_Builder;

public class Student {
    String name;
    Integer age;
    Integer phone;
    public Student(String name, Integer age, Integer phone) {
        if(name == null || age == null){
            throw new Error("Please provide a valid name or age");
        }
        this.name = name;
        this.age = age;
        this.phone = phone;
    }

    public static StudentBuilder getBuilder(){
        return new StudentBuilder();
    }

}

